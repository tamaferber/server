const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://tamaferber:tama2001@cluster0.frjbifx.mongodb.net/SmartFridgeDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Connected to MongoDB Atlas'))
.catch(err => console.error(' MongoDB connection error:', err));



