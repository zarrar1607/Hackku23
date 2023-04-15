from flask import Flask, render_template, request, send_file
import os
import openai
import docx
from docx import Document
from bs4 import BeautifulSoup
import PyPDF2

openai.organization = "org-gG6K1j8fah4HfsIk7JZEGNBO"
openai.api_key = "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"
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/out', methods=['GET', 'POST'])
def out():
    # Get user input from form
    user_string = request.form['user_string']
    user_file = request.files['user_file']
    print(user_file.read())
    # file_path = os.path.join(app.root_path, 'uploads', user_file.filename)
    # user_file.save(file_path)
    # file_path = "".join(file_path.split())
    with open(TextIOWrapper(user_file.read()), 'rb') as f:
        # Create a PDF reader object
        reader = PyPDF2.PdfReader(f)

    # Get the number of pages in the PDF file
    num_pages = len(reader.pages)

    # Loop through each page and extract the text
    for i in range(num_pages):
        # Get the page object
        page = reader.pages[i]
        # Extract the text from the page
        text = page.extract_text()
    soup = BeautifulSoup(text)
    covertxt = soup.get_text()
# job="https://careers.microsoft.com/students/us/en/job/1540490/Software-Engineer-Full-Time-Opportunities-Microsoft-Leap"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "personalise my resume {},according to the job {} make sure you include all my skills and my resume and job description".format(covertxt, user_string)
             }
        ],
        # max_tokens=500
    )
    coverletter = response['choices'][0]['message']['content']
    soup = BeautifulSoup(coverletter)
    covertxt = soup.get_text()
    document = docx.Document()
    document.add_paragraph(covertxt)
    return send_file(document, mimetype=None, as_attachment=True, download_name="download")


if __name__ == '__main__':
    app.run(debug=True)
