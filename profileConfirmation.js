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
    // Get the submission-confirmation div
    const submissionConfirmationDiv = document.getElementById('submission-confirmation');
    // Add the confirmation message to the div
    submissionConfirmationDiv.innerHTML = `<p>Profile submitted successfully!</p>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>College: ${college}</p>
    <p>Classification: ${classification}</p>
    <p>Major: ${major}</p>`;
    // Clear the input values
    nameInput.value = '';
    emailInput.value = '';
    collegeInput.value = '';
    classificationInput.value = '';
    majorInput.value = '';
}
