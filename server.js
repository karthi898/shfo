const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
    const { name, email, phone, address, dob, occupation, gender, message } = req.body;

    const data = `${name},${email},${phone},${address},${dob},${occupation},${gender},${message}\n`;

    fs.appendFile('data.csv', data, (err) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.send('Form submitted successfully!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
