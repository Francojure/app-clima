const express = require('express');
const Search = require('./models/Search');
const router = express.Router();

router.post('/', async (req, res) => {
  const { city, country, temperature, conditionText, icon } = req.body;
  
  try {
    const newSearch = new Search({ city, country, temperature, conditionText, icon });
    await newSearch.save();
    res.status(201).json(newSearch);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save search', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const searches = await Search.find().sort({ date: -1 });
    res.status(200).json(searches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch searches', error });
  }
});

module.exports = router;
