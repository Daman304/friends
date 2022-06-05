const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(express.json())
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});
app.post('/', (req, res) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
      user: 'codingdaman2006@outlook.com',
      pass: 'daman19791983'
    }
  });
  var mailOptions = {
    from: 'codingdaman2006@outlook.com',
    to: 'damanpreetsingh1979@gmail.com',
    subject: `Form submission from ${req.body.name} of ${req.body.ADMNO}`,
    text: `Answers: ${req.body.q1}, ${req.body.q2}, ${req.body.q3}, ${req.body.q4}, ${req.body.q5}, ${req.body.q6}, ${req.body.q7}, ${req.body.q8}, ${req.body.q9}`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('<h1 class="text-center">I have received your answers. Thanks for filling out this form....</h1>')
    }
  });
})
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});