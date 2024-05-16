const express = require('express');
const app = express();
const domain = process.env.APP_API_URL
const port = process.env.PORT
// Example API endpoint
app.get('/api/hello', async (req, res) => {
    res.json({ message: 'Hello from Mocker API!' });
});

app.listen(port, () => {
    console.log(`Mocker API running at ${domain}`);
});
