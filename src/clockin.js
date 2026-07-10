
document.getElementById('clockin-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const empleado = document.getElementById('employee').value;
  const hora = document.getElementById('entryTime').value;
  console.log(empleado, hora);
  try {

    const res = await fetch('/api/clockin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ empleado, hora })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registro Exitoso ' + empleado);
      // Redirigir o mostrar perfil
      console.log("ieeeeei. peace peace")
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

