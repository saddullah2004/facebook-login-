const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/save', (req, res) => {
    const { username, password } = req.body;
    const entry = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile('credentials.txt', entry, (err) => {
        if (err) {
            res.status(500).send("Error saving credentials.");
        } else {
            res.send("Credentials saved successfully!");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
