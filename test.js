import { creatUser } from "./services/signupHandle.js";

const urlUsers = "http://localhost:3000/users";

const user = creatUser("", "yasminayed@gmail.com", "yasminayed@gmail.com");
/**
 * Check if user already exists in the database or not
 * @param {User Object} userdata 
 * @returns {Promise<boolean>} true if user exists, false if user does not exist
 */


    try {
        const response = await fetch(urlUsers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        //const userExists = data.some((user) => user.email === userdata.email && user.password === userdata.password);   
       
    } catch (error) {
        console.error("Error fetching JSON data:", error);
       
    }

