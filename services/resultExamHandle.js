const examResultUrl = 'http://localhost:3000/results';
/**
 * Function to get the results of the user with the given email
 * @param {String} email 
 * @returns array of results objects for the user with the given email
 */
export async function getResults(email) {
    const response = await fetch(examResultUrl);
    try {
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        const results = await response.json();
        const userResults = [];
        results.forEach(element => {
            if(element.email === email){
                //userResults.push({element.examName, element.score});
            }
        });
    }
    catch (error) {
        console.error(error);
    }
    return results;
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