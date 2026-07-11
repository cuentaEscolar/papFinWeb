import { is_admin } from "./force_login.js";

async function clean_navbar() {

  const data = await is_admin();
  console.log(data);
  if (data.loggedIn) {
    console.log("i'm in")
    const am_admin = data.user.admin;
    //
    //   <li class="nav-item bg-custom disabled" id="clockin-li">
    //     <a class="nav-link disabled" id="clockin-a" href="./Clockin.html">Registrar Entrada</a>
    //   </li>
    //   <li class="nav-item bg-custom disabled " id = "clockout-li">
    //     <a class="nav-link disabled" id="clockout-a" href="./Clockout.html">Registrar Salida</a>
    //   </li>
    //   <li class="nav-item bg-custom disabled id="register_user_li">
    //     <a class="nav-link disabled" id="register_user_a" href="./RegisterUser.html">Nuevo Empleado</a>
    //   </li>
    //
    //   <li class="nav-item bg-custom disabled" id="payroll_li">
    //     <a class="nav-link disabled" id="payroll_a" href="./Payroll.html">Nominas</a>
    //   </li>
    document.getElementById('clockin-li').removeAttribute("disabled");
    document.getElementById('clockin-a').removeAttribute("disabled");

    document.getElementById('clockout-li').removeAttribute("disabled");
    document.getElementById('clockout-a').removeAttribute("disabled");

    document.getElementById('register_user-li').removeAttribute("disabled");
    document.getElementById('register_user-a').removeAttribute("disabled");

    if (am_admin) {

      document.getElementById('payroll_li').removeAttribute("disabled");
      document.getElementById('payroll_a').removeAttribute("disabled");
    }



  }
}
console.log("cleaning tha bar");
clean_navbar();
