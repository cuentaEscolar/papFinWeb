
import { is_admin } from "./force_login.js";

async function loadUsers() {

  console.log("loading users");
  const response = await fetch('/api/employee/names');
  const maquilas = await response.json();
  console.log(maquilas);

  const select = document.getElementById("employee-choices");

  select.innerHTML = "";

  maquilas.forEach(empleado => {

    const option = document.createElement("option");
    option.value = empleado.nombre;
    //option.textContent = empleado.nombre;

    select.appendChild(option);

  });

}
is_admin();
console.log("about to load users")
loadUsers();

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

