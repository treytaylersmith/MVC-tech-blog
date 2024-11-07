const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup').value.trim();
  const passwordEl = document.querySelector('#password-input-signup').value.trim();

  if (usernameEl &&  passwordEl.length >=8 ) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ 
        username: usernameEl,
        password: passwordEl,
       }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Must have username and password of 8 or more characters');
    }
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);