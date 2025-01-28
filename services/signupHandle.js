import { User } from "../models/user.js";

const baseUrl = "https://e432-45-104-203-212.ngrok-free.app"; // Base URL without credentials
const urlUsers = `${baseUrl}/users`; // Constructed URL for users

/**
 * Create a new user object
 * @param {string} username - The username of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {User} - The created user object
 */
export function creatUser(username, email, password) {
  return new User(username, email, password);
}

/**
 * Check if user already exists in the database
 * @param {string} email - The email of the user to check
 * @returns {Promise<boolean>} - true if user exists, false otherwise
 */
async function checkUserExistence(email) {
  try {
    const response = await fetch(urlUsers, {
      headers: {
        'Authorization': 'Basic ' + btoa('killua:2000Hani') // Add credentials here
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.some((user) => user.email === email);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return false;
  }
}

/**
 * Receive data from the signup form and create a new user
 * @param {string} username - The username of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<void>}
 */
export async function recievedData(username, email, password) {
  const newUser = creatUser(username, email, password);
  const userExists = await checkUserExistence(newUser.email);

  if (userExists) {
    window.location.href = "../pages/login.html";
    return;
  }

  try {
    await sendUserToDatabase(newUser);
    window.location.href = "../pages/completeRegister.html";
  } catch (error) {
    console.error("Error sending user to database:", error);
  }
}

/**
 * Send the new user object to the database
 * @param {User} user - The user object to send
 * @returns {Promise<void>}
 */
async function sendUserToDatabase(user) {
  try {
    const response = await fetch(urlUsers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Basic ' + btoa('killua:2000Hani') // Add credentials here
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending user to database:", error);
    throw error;
  }
}