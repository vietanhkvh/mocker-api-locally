// my-app/mocker-api/index.js
const express = require('express');
const app = express();
const port = 3001;

// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Mocker API!' });
});

app.listen(port, () => {
    console.log(`Mocker API running at http://localhost:${port}`);
});
