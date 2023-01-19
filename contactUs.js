const form = document.querySelector('#myform');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');
      if (name.value === '' || email.value === '' || message.value === '') {
        alert('Please fill out all fields');
      } else {
        // form is valid, submit the form
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        window.location.href = `mailto:jayeshpaluru@gmail.com?subject=Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
      }
    });
