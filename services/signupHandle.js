import { User } from "../models/user.js";

let newUser;
const urlUsers = "http://localhost:3000/users";

/**
 * Create a new user object
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {User Object}
 */
export function creatUser(username, email, password) {
  const user = new User(username, email, password);
  return user;
}
/**
 * Check if user already exists in the database or not
 * @param {string} email
 * @returns {Promise<boolean>} true if user exists, false if user does not exist
 */
async function checkUserExistence(email) {
  try {
    const response = await fetch(urlUsers);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const userExists = data.some((user) => user.email === email);
    return userExists;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return false;
  }
}
/**
 * Receive data from the signup form and create a new user
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {void}
 */
export async function recievedData(username, email, password) {
  newUser = creatUser(username, email, password);
  const userExists = await checkUserExistence(newUser.email);
  if (userExists) {
    window.history.replaceState({}, null, "/");
    window.location.href = "../pages/login.html";
  } else {
    try {
      sendUserToDatabase(newUser);
      window.history.replaceState({}, null, "/");
      window.location.href = "../pages/completeRegister.html";
    } catch (error) {
      console.error("Error sending user to database:", error);
    }
  }
}
/**
 * Send the new user object to the database
 * @param {User Object} user
 * @returns {void}
 */
async function sendUserToDatabase(user) {
  const response = await fetch(urlUsers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
