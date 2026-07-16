import { is_admin } from "./force_login.js";
is_admin();

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const full_name = document.getElementById('full_name').value;
  const birthday = document.getElementById('birthday').value;
  const id_maquila = document.getElementById('id_maquila').value;
  console.log(full_name, birthday, id_maquila);
  try {

    const res = await fetch('/api/register_regular_user', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, birthday, id_maquila })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registro Exitoso ' + full_name);
      // Redirigir o mostrar perfil
      //const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      //modal.hide();
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Error en la conexión', err);
  }

});




async function loadMaquilas() {

  const response = await fetch('/api/maquilas');
  const maquilas = await response.json();
  console.log(maquilas);

  const select = document.getElementById("id_maquila");

  select.innerHTML = "";

  maquilas.forEach(maquila => {
    if (maquila.nombre === "Salariado") { return true; }

    const option = document.createElement("option");
    option.value = maquila.id;
    option.textContent = maquila.nombre;

    select.appendChild(option);

  });

}
console.log("about to load maquilas")
loadMaquilas();
