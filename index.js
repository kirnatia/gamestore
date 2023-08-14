const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cors
const cors = require('cors');
app.use(cors());

// init db client
const client = require('./db/client');
client.connect();

// Serve API routes
app.use('/api', require('./api'));

// Serve React app (build folder) statically
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
