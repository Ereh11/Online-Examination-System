const examResultUrl = 'http://localhost:3000/results';
/**
 * Function to get the results of the user with the given email
 * @param {String} email 
 * @returns array of results objects for the user with the given email, sturctur of the object: {email: email, examName: topic, score: score}
 */
export async function getResults(email) {
    const response = await fetch(examResultUrl);
    const userResults = [];
    try {
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        const results = await response.json();
        results.forEach(element => {
            if (element.email === email) {
                userResults.push(element);
            }
        });
    }
    catch (error) {
        window.location.replace("../pages/error.html");
    }
    return userResults;
}
/**
 * Function to add the result of the user to the database
 * @param {Object} result 
 * 
 */
export async function addResult(result) {
    const response = await fetch(examResultUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    });
    try {
        if (!response.ok) {
            throw new Error('Failed to add result');
        }
    }
    catch (error) {
        window.location.replace("../pages/error.html");
    }
}