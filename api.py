from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
import docx
from docx import Document

# Set up MongoDB connection
client = MongoClient(
    "mongodb+srv://mab:temp1234@nodelearn.ttlxgol.mongodb.net/form?retryWrites=true&w=majority")
db = client['formdata']
collection = db['test1']

# Create Flask application
app = Flask(__name__)

# Define route for the form page


@app.route('/')
def show_form():
    return render_template('form.html')

# Define route for form submission


@app.route('/submit', methods=['POST'])
def submit_form():
    # Extract form data
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    # Insert data into MongoDB collection
    collection.insert_one({'name': name, 'email': email, 'message': message})

    # Return a response
    return 'data submitted'


@app.route('/data')
def get_data():
    # Retrieve all data from the MongoDB collection
    data = collection.find()

    # Convert the data to a list of dictionaries
    data_list = []
    for document in data:
        data_list.append(
            {'name': document['name'], 'email': document['email'], 'message': document['message']})
    info = data_list[0]['name'] + \
        data_list[0]['email'] + data_list[0]['message']
    document = docx.Document()
    document.add_paragraph(info)
    document.save("resdoc.docx")

    # Return the data as JSON
    return jsonify(data_list[0])


# Run the Flask application
if __name__ == '__main__':
    app.run()
