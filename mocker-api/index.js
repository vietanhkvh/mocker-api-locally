const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
// Example API endpoint
app.get('/api/hello', async (req, res) => {
    res.json({ message: 'Hello from Mocker API!' });
});

app.listen(port, () => {
    console.log(`Mocker API running at http://localhost:${port}`);
});