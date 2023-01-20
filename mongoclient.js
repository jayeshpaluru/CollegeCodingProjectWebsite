const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority';

let personalInfoSubmitted = false;
let resumeSubmitted = false;

const parseResume = () => {
    // Get the input element
    const input = document.getElementById('resume-input');
    // Get the file
    const file = input.files[0];
    // Create a new instance of the resume parser
    const resumeParser = new ResumeParser();
    // Parse the resume
    resumeParser.parseResume(file, (err, resume) => {
        if (err) {
            console.error(err);
        } else {
            console.log(resume);
            const parsedResumeDiv = document.getElementById('parsed-resume');
            parsedResumeDiv.innerHTML = `<p>Resume parsed successfully!</p>`;
            resumeSubmitted = true;
            checkSubmission();
        }
    });
}

const submitProfile = () => {
    // Get the input elements
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const collegeInput = document.getElementById('college-input');
    const classificationInput = document.getElementById('classification-input');
    const majorInput = document.getElementById('major-input');
    // Get the input values
    const name = nameInput.value;
    const email = emailInput.value;
    const college = collegeInput.value;
    const classification = classificationInput.value;
    const major = majorInput.value;
    // Save the profile to MongoDB
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Connected to MongoDB');
            const db = client.db('mydb');
            const collection = db.collection('profiles');
            collection.insertOne({
                name,
                email,
                college,
                classification,
                major
            }, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Profile saved to MongoDB');
                    personalInfoSubmitted = true;
                    checkSubmission();
                }
                client.close();
            });
        }
    });
}

const checkSubmission = () => {
    if (personalInfoSubmitted && resumeSubmitted) {
        // Clear the input values
        document.getElementById('name-input').value = '';
        document.getElementById('email-input').value = '';
        document.getElementById('college-input').value = '';
        document.getElementById('classification-input').value = '';
        document.getElementById('major-input').value = '';
    }}