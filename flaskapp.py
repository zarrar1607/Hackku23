from flask import Flask, render_template, request, send_file
from io import BytesIO
from reportlab.pdfgen import canvas

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/out', methods=['GET','POST'])
def out():
    # Get user input from form
    user_string = request.form['user_string']
    user_file = request.files['user_file']
    return send_file(user_file,mimetype=None,as_attachment=True,download_name="download")

if __name__ == '__main__':
    app.run(debug=True)
