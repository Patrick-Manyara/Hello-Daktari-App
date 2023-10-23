import axios from "axios";
const url = "https://hello.angacinemas.com/endpoints/login.php";
async function authenticate(mode, email, password) {
  const body = new FormData();
  body.append("user_email", email);
  body.append("user_password", password);
  body.append("returnSecureToken", true);
  const response = await fetch(
    "https://hello.angacinemas.com/endpoints/login.php",
    {
      method: "POST",
      body: body,
    }
  );

  // if (!response.ok) {
  //   return false;
  // }

  const responseJson = await response.json();
  console.log(responseJson);

  if (responseJson.data.user_id) {
    return responseJson.data;
  } else {
    return false;
  }
}

async function postClient(email, password, name, phone) {
  const body = new FormData();
  body.append("user_email", email);
  body.append("user_password", password);
  body.append("user_name", name);
  body.append("user_phone", phone);
  body.append("returnSecureToken", true);
  const response = await fetch(
    "https://hello.angacinemas.com/endpoints/register.php",
    {
      method: "POST",
      body: body,
    }
  );

  const responseJson = await response.json();
  console.log(responseJson);

  if (responseJson.data.user_id) {
    return responseJson.data;
  } else {
    return false;
  }
}

export function createUser(email, password, name, phone) {
  return postClient(email, password, name, phone);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
