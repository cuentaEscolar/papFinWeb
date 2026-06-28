console.log("hi")
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log(username, password);
  try {

    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login exitoso: ' + username);
      // Redirigir o mostrar perfil
      console.log("ieeeeei. peace peace")
      window.location.href = "MainMenu.html"
      //const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      //modal.hide();
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Error en la conexión');
  }
});

