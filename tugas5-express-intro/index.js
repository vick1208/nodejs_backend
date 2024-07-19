const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Hello There User");
});
app.get('/hello', (req, res) => {
    res.send({
        "message": "Success fetch message",
        "data": "Hello World!"
    });
});
app.get('/user', (req, res) => {
    res.send({
        "message": "Success fetch message",
        "data": {
            id: 1,
            name: "Budi",
            username: "budidu",
            email: "budidu@mail.com"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server runs at localhost:${PORT}`);
});
