import { creatUser } from "./signupHandle.js";

const urlUsers = "http://localhost:3000/users";
/**
 * Recieve data from the login form and check if user identity in the database
 * @param {string} email 
 * @param {string} password 
 * @returns {void}
 */
export async function recievedData(email, password) {
    const user = creatUser("", email, password);
    const userCheck = await checkIdentity(user);
    if (userCheck) {
        localStorage.setItem("email", email);
        return true;
    } else {
        window.history.replace("../pages/error.html");
        return false;
    }
}

/**
 * Check if user already exists in the database or not
 * @param {User Object} userdata 
 * @returns {Promise<boolean>} true if user exists, false if user does not exist
 */

async function checkIdentity(userdata) { 
    try {
        const response = await fetch(urlUsers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const userExists = data.some((user) => user.email === userdata.email && user.password === userdata.password);   
        return userExists;
    } catch (error) {
        window.history.replace("../pages/error.html");
        return false;
    }
}
