const ResumeParser = require('resume-parser');

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
            // Get the parsed-resume div
            const parsedResumeDiv = document.getElementById('parsed-resume');
            // Clear the div
            parsedResumeDiv.innerHTML = '';
            // Add the parsed data to the div
            for (const key in resume) {
                parsedResumeDiv.innerHTML += `<p>${key}: ${resume[key]}</p>`;
            }
            // Get the upload-confirmation div
            const uploadConfirmationDiv = document.getElementById('upload-confirmation');
            // Add the confirmation message to the div
            uploadConfirmationDiv.innerHTML = '<p>Resume uploaded and parsed successfully!</p>';
        }
    });
}