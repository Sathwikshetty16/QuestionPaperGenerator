
const express = require('express');
const generateQuestionPaper = require('./questionPaperGenerator');
const sampleData = require('./sampleData');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('frontend/public'));

app.get('/', (req, res) => {
  res.render('index', { questionPaper: null });
});

app.post('/generate', express.urlencoded({ extended: true }), (req, res) => {
  const totalMarks = parseInt(req.body.totalMarks);
  const easyPercentage = parseFloat(req.body.easyPercentage);
  const mediumPercentage = parseFloat(req.body.mediumPercentage);
  const hardPercentage = parseFloat(req.body.hardPercentage);

  if (isNaN(totalMarks) || isNaN(easyPercentage) || isNaN(mediumPercentage) || isNaN(hardPercentage)) {
    return res.status(400).send('Invalid input. Please enter valid numbers.');
  }

  const distribution = {
    easy: easyPercentage / 100,
    medium: mediumPercentage / 100,
    hard: hardPercentage / 100,
  };

  const questionPaper = generateQuestionPaper(totalMarks, distribution);
  res.render('index', { questionPaper });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
