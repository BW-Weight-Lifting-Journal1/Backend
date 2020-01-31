require('dotenv').config();
const server = require('./api/server.js');

server.listen(process.env.PORT, () => console.log(`\n** Running on port ${process.env.PORT} **\n`));