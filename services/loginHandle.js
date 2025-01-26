import { creatUser } from "./signupHandle.js";

const urlUsers = "http://localhost:3001/users";

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
        window.history.replaceState({}, null, "/");
        window.location.href = "../pages/startExam.html";
    } else {
        try {
            window.location.href = "../pages/completeRegister.html";
        } catch (error) {
            console.error("Error sending user to database:", error);
        }
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
        console.error("Error fetching JSON data:", error);
        return false;
    }
}
