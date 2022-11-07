/** @format */

import axios from "axios";
import { URL, server_URL } from "./urls_config";

function other_users_check(email_id) {
  // Add official keywords
  let keywords = ["hod", "advisor", "iqac", "dean", "principal","admin"];
  const result = keywords.filter((word) => email_id.includes(word));
  console.log(result)
  return result.length != 0 ? true : false;
}

export default function handleLogin() {
  const loginButton = document.getElementById("login_btn");
  loginButton.disabled = true;
  loginButton.innerHTML = `<div class="spinner1"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`;
  document.getElementById("pass-fail").style.display = "none";
  document.getElementById("email-fail").style.display = "none";
  document.getElementById("server-fail").style.display = "none";

  let params = new URLSearchParams();
  params.append("email", document.getElementById("emailId").value);
  params.append("password", document.getElementById("password").value);

  let email = document.getElementById("emailId").value;

  axios.post(server_URL + "userlogin", params).then((result) => {
    // Check 1: email belongs to licet domain and user not present
    console.log(result.data)
    if (
      result.data == "user-fail" &&
      email.includes("@licet.ac.in") &&
      !other_users_check(email)
    ) {
      window.location.href = URL + "Student#/auth/GeneralInformationdata";
    }

    // Check 2: invalid user
    else if (result.data === "user-fail") {
      document.getElementById("email-fail").style.display = "block";
      localStorage.setItem("auth_token", -1);
      loginButton.disabled = false;
      loginButton.innerHTML = `Login`;

      // Check 3: invalid password
    } else if (result.data === "pass-fail") {
      console.log("Incorrect password");
      document.getElementById("pass-fail").style.display = "block";
      localStorage.setItem("auth_token", -1);
      loginButton.disabled = false;
      loginButton.innerHTML = `Login`;

      // Server Issue
    } else if (result.data === "server-down") {
      localStorage.setItem("auth_token", -1);
      document.getElementById("server-fail").style.display = "block";
      loginButton.disabled = false;
      loginButton.innerHTML = `Login`;
    }
    // Logged In
    else {
      console.log("Logged In");
      var check = result.data[0];
      console.log(check);

      if (check.user_type == 2) {
        localStorage.setItem("user_type", "hod");
        localStorage.setItem("dept", check.dept);
        localStorage.setItem("hodemail", check.email);
        window.location.href = URL + "HoD#/admin2/dashboard";
      } else if (check.user_type == 1) {
        localStorage.setItem("user_type", "class_advisor");
        localStorage.setItem("batch", check.batch);
        localStorage.setItem("dept", check.dept);
        localStorage.setItem("caemail", check.email);
        window.location.href = URL + "Class-Advisor#/admin1/dashboard";
      } else if (check.user_type == 3) {
        localStorage.setItem("user_type", "official");
        localStorage.setItem("offemail", check.email);
        window.location.href = URL + "LICET#/admin3/dashboard";
      } else if (check.user_type == 4) {
        console.log("KK")
        localStorage.setItem("user_type", "admin");
        localStorage.setItem("hodemail", check.email);
        window.location.href = URL + "Admin#/admin4/dashboard";
      } else if (check.user_type == 0) {
        if (check.roll_no == null) {
          console.log(check.roll_no);
          window.location.href = URL + "Student#/auth/GeneralInformationdata";
        } else {
          localStorage.setItem("user_type", "student");
          localStorage.setItem("StudentRoll", check.roll_no);
          window.location.href = URL + "Student#/admin0/GeneralInformation";
        }
      }
      localStorage.setItem("useremail", result.data[0].email);
      localStorage.setItem("auth_token", result.data[0].auth_token);
      localStorage.setItem("user_name", result.data[0].user_name);
      loginButton.disabled = false;
      loginButton.innerHTML = `Login`;
    }
  });
  /*    .catch((err) => {
      document.getElementById("pass-fail").classList.add("d-none");
      document.getElementById("email-fail").classList.add("d-none");
      document.getElementById("server-fail").classList.remove("d-none");
    }); */
}
