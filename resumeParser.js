const parseResume = () => {
    // Get the input element
    const input = document.getElementById('resume-input');
    // Get the file
    const file = input.files[0];
    // Create a new instance of the resume parser
    const reader = new FileReader();
    reader.onload = () => {
        const resumeText = reader.result;
        // Define regular expressions for the different fields
        const nameRegex = /Name: ([a-zA-Z ]+)/;
        const emailRegex = /Email: ([\S]+@[\S]+)/;
        const phoneRegex = /Phone: ([\d-]+)/;
        const educationRegex = /Education: ([\w\s]+)/;
        const experienceRegex = /Experience: ([\w\s]+)/;
        const skillsRegex = /Skills: ([\w\s,]+)/;
        // Extract the information using the regular expressions
        const name = nameRegex.exec(resumeText)[1];
        const email = emailRegex.exec(resumeText)[1];
        const phone = phoneRegex.exec(resumeText)[1];
        const education = educationRegex.exec(resumeText)[1];
        const experience = experienceRegex.exec(resumeText)[1];
        const skills = skillsRegex.exec(resumeText)[1];
        // Get the parsed-resume div
        const parsedResumeDiv = document.getElementById('parsed-resume');
        // Clear the div
        parsedResumeDiv.innerHTML = '';
        // Add the parsed data to the div
        parsedResumeDiv.innerHTML += `<p>Name: ${name}</p>`;
        parsedResumeDiv.innerHTML += `<p>Email: ${email}</p>`;
        parsedResumeDiv.innerHTML += `<p>Phone: ${phone}</p>`;
        parsedResumeDiv.innerHTML += `<p>Education: ${education}</p>`;
        parsedResumeDiv.innerHTML += `<p>Experience: ${experience}</p>`;
        parsedResumeDiv.innerHTML += `<p>Skills: ${skills}</p>`;
        // Get the upload-confirmation div
        const uploadConfirmationDiv = document.getElementById('upload-confirmation');
        // Add the confirmation message to the div
        uploadConfirmationDiv.innerHTML = '<p>Resume uploaded and parsed successfully!</p>';
    };
    reader.readAsText(file);
};
