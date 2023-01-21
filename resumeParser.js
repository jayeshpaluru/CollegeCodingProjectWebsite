const ResumeParser = require('parsimmon');
const parseResume = () => {
    // Get the input element
    const input = document.getElementById('resume-input');
    // Get the file
    const file = input.files[0];
    // Create a new instance of the resume parser
    const resumeText = readResumeFile(file);
    const resumeParser = new ResumeParser();
    // Define a grammar for the resume
    const name = resumeParser.regex(/[a-zA-Z ]+/);
    const email = resumeParser.regex(/\S+@\S+/);
    const phone = resumeParser.regex(/\d{3}-\d{3}-\d{4}/);
    const education = resumeParser.regex(/Education: [\w\s]+/);
    const experience = resumeParser.regex(/Experience: [\w\s]+/);
    const skills = resumeParser.regex(/Skills: [\w\s,]+/);
    const resumeGrammar = name.trim(ResumeParser.optWhitespace)
    .then(email.trim(ResumeParser.optWhitespace))
    .then(phone.trim(ResumeParser.optWhitespace))
    .then(education.trim(ResumeParser.optWhitespace))
    .then(experience.trim(ResumeParser.optWhitespace))
    .then(skills.trim(ResumeParser.optWhitespace));
    // Parse the resume
    const resumeData = resumeGrammar.parse(resumeText);
    if (!resumeData.status) {
        console.error(resumeData.message);
    } else {
        // Get the parsed-resume div
        const parsedResumeDiv = document.getElementById('parsed-resume');
        // Clear the div
        parsedResumeDiv.innerHTML = '';
        // Add the parsed data to the div
        parsedResumeDiv.innerHTML += `<p>Name: ${resumeData.value.name}</p>`;
        parsedResumeDiv.innerHTML += `<p>Email: ${resumeData.value.email}</p>`;
        parsedResumeDiv.innerHTML += `<p>Phone: ${resumeData.value.phone}</p>`;
        parsedResumeDiv.innerHTML += `<p>Education: ${resumeData.value.education}</p>`;
        parsedResumeDiv.innerHTML += `<p>Experience: ${resumeData.value.experience}</p>`;
        parsedResumeDiv.innerHTML += `<p>Skills: ${resumeData.value.skills}</p>`;
        // Get the upload-confirmation div
        const uploadConfirmationDiv = document.getElementById('upload-confirmation');
        // Add the confirmation message to the div
        uploadConfirmationDiv.innerHTML = '<p>Resume uploaded and parsed successfully!</p>';
    }
};

const readResumeFile = (file) => {
    // code to read the file and return the file text
    // for example using FileReader
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      return reader.result;
    };
}
