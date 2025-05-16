const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Token de verificación
const VERIFY_TOKEN = 'roseglow123';

// Verificación del webhook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verificado ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Reenvía el mensaje a Make
app.post('/webhook', async (req, res) => {
  try {
    await axios.post('https://hook.eu2.make.com/6is416ibhhjnl8izmt2vcfay65jo7rp4', req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en puerto ${process.env.PORT}`);
});
