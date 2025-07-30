// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fridgeRoute = require('./routes/fridge'); 
// const usersRouter = require('./routes/users'); 
// const adminRouter = require('./routes/admin'); 
// const cartRouter = require('./routes/cart');

// require('./db');  //connection to Database

// const app = express();
// const PORT = process.env.PORT || 3000;


// // app.use(cors());
// const corsOptions = {
//   origin: 'https://smartfridge-client.onrender.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 204
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// app.use(bodyParser.json());
// app.use('/api/fridge', fridgeRoute); 
// app.use('/api/users', usersRouter);  
// app.use('/api/admin', adminRouter);
// app.use('/api/cart', cartRouter);



// app.listen(PORT, () => {
// console.log(`Server is running. Try accessing via Render URL in production or http://localhost:${PORT} locally.`);
// });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Server is working correctly.');
});

app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});
