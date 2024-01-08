import { Path } from "../constants/path";

const loginurl = Path.API_URL + "login.php";
const registerurl = Path.API_URL + "register.php";

const docLoginUrl = Path.API_URL + "doctor.php?action=login";
const docRegisterUrl = Path.API_URL + "doctor.php?action=register";

async function authenticate(mode, email, password) {
  const formData = new FormData();
  formData.append("user_email", email);
  formData.append("user_password", password);
  formData.append("returnSecureToken", true);
  const response = await fetch(loginurl, {
    method: "POST",
    body: formData,
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
  const formData = new FormData();
  formData.append("user_email", email);
  formData.append("user_password", password);
  formData.append("user_name", name);
  formData.append("user_phone", phone);
  formData.append("returnSecureToken", true);
  const response = await fetch(registerurl, {
    method: "POST",
    body: formData,
  });

  const responseJson = await response.json();

  if (responseJson.data.user_id) {
    return responseJson.data;
  } else {
    return false;
  }
}

async function docLogin(email, password) {
  const formData = new FormData();
  formData.append("doctor_email", email);
  formData.append("doctor_password", password);
  formData.append("returnSecureToken", true);
  const response = await fetch(docLoginUrl, {
    method: "POST",
    body: formData,
  });
  const responseJson = await response.json();

  if (responseJson.data) {
    return responseJson.data;
  } else {
    return false;
  }
}

async function postDoctor(email, password, fullname, phone, license, bio) {
  const formData = new FormData();
  formData.append("doctor_email", email);
  formData.append("doctor_password", password);
  formData.append("doctor_name", fullname);
  formData.append("doctor_phone", phone);
  formData.append("doctor_license", license);
  formData.append("doctor_bio", bio);
  formData.append("returnSecureToken", true);
  const response = await fetch(docRegisterUrl, {
    method: "POST",
    body: formData,
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
