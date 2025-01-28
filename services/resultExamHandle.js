const baseUrl = 'https://e432-45-104-203-212.ngrok-free.app'; // Base URL without credentials
const examResultUrl = `${baseUrl}/results`; // Constructed URL for results

/**
 * Function to get the results of the user with the given email
 * @param {String} email - The email of the user
 * @returns {Array} - Array of results objects for the user with the given email
 * Structure of the object: {email: email, examName: topic, score: score}
 */
export async function getResults(email) {
    try {
        const response = await fetch(examResultUrl, {
            headers: {
                'Authorization': 'Basic ' + btoa('killua:2000Hani') // Add credentials here
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }

        const results = await response.json();
        const userResults = results.filter(element => element.email === email); // Filter results by email
        return userResults;
    } catch (error) {
        console.error('Error fetching results:', error);
        return []; // Return an empty array in case of error
    }
}

/**
 * Function to add the result of the user to the database
 * @param {Object} result - The result object to add
 * Structure of the object: {email: email, examName: topic, score: score}
 */
export async function addResult(result) {
    try {
        const response = await fetch(examResultUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('killua:2000Hani') // Add credentials here
            },
            body: JSON.stringify(result)
        });

        if (!response.ok) {
            throw new Error('Failed to add result');
        }
    } catch (error) {
        console.error('Error adding result:', error);
    }
}