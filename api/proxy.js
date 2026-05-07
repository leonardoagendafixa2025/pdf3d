const axios = require('axios');

module.exports = async (req, res) => {
  const targetUrl = "https://6000-firebase-studio-1778173564002.cluster-xvr5pmatm5a4gx76fmat6kxt6o.cloudworkstations.dev/";

  try {
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': req.headers['user-agent']
      },
      validateStatus: () => true
    });

    // Copia os cabeçalhos originais, mas remove os que bloqueiam o iframe
    Object.keys(response.headers).forEach(key => {
      if (!['x-frame-options', 'content-security-policy', 'transfer-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, response.headers[key]);
      }
    });

    // Força a permissão de iframe
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("Erro ao carregar o site via proxy: " + error.message);
  }
};
