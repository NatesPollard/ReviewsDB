const express = require('express'); 
const sequelize = require('./config'); 
const Review = require('./models/review'); 
const app = express(); 
const cors = require('cors'); 

app.use(cors());
app.use(express.json());

sequelize // Test the database connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

  
  // Sync models with the database
  sequelize
    .sync({ force: true }) // Force sync (drops tables if they exist)
    .then(() => {
      console.log('Database synced successfully.');
    })
    .catch((error) => {
      console.error('Unable to sync database:', error);
    });
  


// POST endpoint to add a review
app.post('/api/reviews', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save review.' });
  }
});

app.get('/api/reviews', async (req, res) => {
try {
  const reviews = await Review.findAll({ order:[['createdAt', 'DESC']] });
  res.json(reviews);
}catch (err) {
  console.error('Error fetching reviews:', err);
  res.status(500).json({ error: 'Failed to fetch reviews.' });
}
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
