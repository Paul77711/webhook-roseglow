const express = require('express');
const axios = require('axios');
const app = express();

// Render te asigna automáticamente el puerto a través de process.env.PORT
const PORT = process.env.PORT;

app.use(express.json());

const VERIFY_TOKEN = 'roseglow123';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  try {
    await axios.post('https://hook.eu2.make.com/6is416ibhhjnl8izmt2vcfay65jo7rp4', req.body);
    res.status(200).send('Reenviado a Make con éxito');
  } catch (err) {
    console.error('❌ Error al reenviar a Make:', err.message);
    res.status(500).send('Error al reenviar');
  }
});

// ESTA ES LA LÍNEA CLAVE
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

