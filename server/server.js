import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar dotenv para cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

// Verificar las variables de entorno
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  conditionText: String,
});

const Search = mongoose.model('Search', searchSchema);

// Routes
app.get('/api/search', async (req, res) => {
  const searches = await Search.find();
  res.json(searches);
});

app.post('/api/search', async (req, res) => {
  const newSearch = new Search(req.body);
  await newSearch.save();
  res.json(newSearch);
});

app.listen(port, () => {
  console.log(`Server running on  ${port}`);
});
