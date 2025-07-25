const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fridgeRoute = require('./routes/fridge'); 
const usersRouter = require('./routes/users'); 
require('./db');  //connection to Database

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(bodyParser.json());
app.use('/api/fridge', fridgeRoute); 
app.use('/api/users', usersRouter);  

app.listen(PORT, () => {
console.log(`Server is running. Try accessing via Render URL in production or http://localhost:${PORT} locally.`);
});
