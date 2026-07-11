export async function is_admin() {
  const response = await fetch('/api/check-session', {
    credentials: 'include'
  });
  const data = await response.json();

  console.log(data);
  if (!data.loggedIn) {

    alert('No hay usuario activo');
    window.location.href = '/Login.html';
    return data;
  }

  return data;

}

