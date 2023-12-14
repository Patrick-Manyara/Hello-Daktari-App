import { Path } from "../constants/path";

const loginurl = Path.API_URL + "login.php";
const registerurl = Path.API_URL + "register.php";

const docLoginUrl = Path.API_URL + "doctor.php?action=login";
const docRegisterUrl = Path.API_URL + "doctor.php?action=register";

async function authenticate(mode, email, password) {
  const body = new FormData();
  body.append("user_email", email);
  body.append("user_password", password);
  body.append("returnSecureToken", true);
  const response = await fetch(loginurl, {
    method: "POST",
    body: body,
  });

  // if (!response.ok) {
  //   return false;
  // }

  const responseJson = await response.json();

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
  const response = await fetch(registerurl, {
    method: "POST",
    body: body,
  });

  const responseJson = await response.json();

  if (responseJson.data.user_id) {
    return responseJson.data;
  } else {
    return false;
  }
}

async function docLogin(email, password) {
  const body = new FormData();
  body.append("doctor_email", email);
  body.append("doctor_password", password);
  body.append("returnSecureToken", true);
  const response = await fetch(docLoginUrl, {
    method: "POST",
    body: body,
  });
  const responseJson = await response.json();

  if (responseJson) {
    return responseJson.data;
  } else {
    return false;
  }
}

async function postDoctor(email, password, fullname, phone, license, bio) {
  const body = new FormData();
  body.append("doctor_email", email);
  body.append("doctor_password", password);
  body.append("doctor_name", fullname);
  body.append("doctor_phone", phone);
  body.append("doctor_license", license);
  body.append("doctor_bio", bio);
  body.append("returnSecureToken", true);
  const response = await fetch(docRegisterUrl, {
    method: "POST",
    body: body,
  });

  const responseJson = await response.json();

  if (responseJson.data) {
    return responseJson.data;
  } else {
    return false;
  }
}

export function createUser(email, password, name, phone) {
  return postClient(email, password, name, phone);
}

export function createDoctor(email, password, fullname, phone, license, bio) {
  return postDoctor(email, password, fullname, phone, license, bio);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export function doctorLogin(email, password) {
  return docLogin(email, password);
}
