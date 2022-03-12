const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require("dotenv")
dotenv.config()
var http = require('http').createServer(app);
const api = require('./routes/route')


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('short'));
app.use(express.json());
app.use(helmet());

app.use(api);

app.use((req, res, next) => {
    res.status(404);
    res.end('NOT FOUND')

});

let server;
module.exports = {
    start(port) {
        server = http.listen(port, () => {
            console.log(`App started on port ${port}`);
        });
        return http;
    },
    stop() {
        server.close();
    }
};
