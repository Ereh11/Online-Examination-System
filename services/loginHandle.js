import { creatUser } from "./signupHandle.js";

const urlUsers = "https://e432-45-104-203-212.ngrok-free.app/users"; // URL without credentials

/**
 * Receive data from the login form and check if user identity exists in the database
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<boolean>} true if user exists and credentials match, false otherwise
 */
export async function recievedData(email, password) {
    const user = creatUser("", email, password);
    const userCheck = await checkIdentity(user);
    if (userCheck) {
        localStorage.setItem("email", email);
        return true;
    } else {
        console.error("User not found or credentials do not match.");
        return false;
    }
}

/**
 * Check if user already exists in the database and if credentials match
 * @param {User Object} userdata 
 * @returns {Promise<boolean>} true if user exists and credentials match, false otherwise
 */
async function checkIdentity(userdata) {
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
        const userExists = data.some((user) => user.email === userdata.email && user.password === userdata.password);
        return userExists;
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        return false;
    }
}