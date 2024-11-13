const http = require('http');
const https = require('https');

exports.handler = async function (event, context) {
    const path = event.path; // Capture the path of the incoming request
    const backendUrl = `http://13.200.12.3${path}`; // Target backend URL

    // Return a promise with the HTTP request to the backend server
    const data = await new Promise((resolve, reject) => {
        const req = http.request(backendUrl, (res) => {
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => resolve(body));
        });

        req.on('error', (error) => reject(error));
        req.end();
    });

    // Return the response from the backend to the client
    return {
        statusCode: 200,
        body: data,
    };
};
