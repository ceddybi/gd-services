import admin from 'firebase-admin';
import cors from 'cors';
import bodyParser from 'body-parser';
import app from '../src/functions';

const PORT = process.env.PORT || 3033;
// enable cors
var corsOptions = {
  origin: `http://localhost:${PORT}`,
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Served on ${PORT}`));
