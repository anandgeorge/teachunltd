const express = require('express')
const app = express()
const port = 80

// replace hello world with whatever string has been asked for by the certificate

app.get('*', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('App running')
})

// install express before running