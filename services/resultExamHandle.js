const examResultUrl = 'https://32c2-45-104-203-212.ngrok-free.app/results';
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
            if(element.email === email){
                userResults.push(element);
            }
        });
    }
    catch (error) {
        console.error(error);
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
        console.error(error);
    }
}