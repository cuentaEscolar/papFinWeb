
async function load_last_week_payroll() {

  const response = await fetch('/api/weekly_payroll');
  const nominas = (await response.json())[0];
  console.log(nominas);

  const tbody = document.getElementById("full-week-payroll-body");

  tbody.innerHTML = "";

  nominas.forEach(nomina_empleado => {

    const row = document.createElement("tr");
    Object.values(nomina_empleado).forEach(text => {
      const cell = document.createElement("td");
      cell.textContent = text; // Safe text insertion
      row.appendChild(cell);
    });

    tbody.appendChild(row);

  });

}

async function load_current_week_payroll() {

  const response = await fetch('/api/current_payroll');
  const nominas = (await response.json())[0];
  console.log(nominas);

  const tbody = document.getElementById("current-daily-payroll-body");

  tbody.innerHTML = "";

  nominas.forEach(nomina_empleado => {

    const row = document.createElement("tr");
    Object.values(nomina_empleado).forEach(text => {
      const cell = document.createElement("td");
      cell.textContent = text; // Safe text insertion
      row.appendChild(cell);
    });

    tbody.appendChild(row);

  });

}

document.getElementById('full-week-payroll-button').addEventListener('click', async (e) => {
  e.preventDefault();
  load_last_week_payroll();
});


document.getElementById('current-daily-payroll-button').addEventListener('click', async (e) => {
  e.preventDefault();
  load_current_week_payroll();
});

load_last_week_payroll();
load_current_week_payroll();

