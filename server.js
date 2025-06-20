const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const settingsRoute = require('./routes/settings');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/settings', settingsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
