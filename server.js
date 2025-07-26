const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fridgeRoute = require('./routes/fridge'); 
const usersRouter = require('./routes/users'); 
const adminRouter = require('./routes/admin'); 

require('./db');  //connection to Database

const app = express();
const PORT = process.env.PORT || 3000;


// app.use(cors());
const corsOptions = {
  origin: 'https://smartfridge-client.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/fridge', fridgeRoute); 
app.use('/api/users', usersRouter);  
app.use('/api/admin', adminRouter);


app.listen(PORT, () => {
console.log(`Server is running. Try accessing via Render URL in production or http://localhost:${PORT} locally.`);
});

