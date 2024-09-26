const fetch = require('node-fetch'); 
require('dotenv').config();

// Función para obtener el access token de Blizzard
const getAccessToken = async () => {
  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;

  const tokenUrl = 'https://us.battle.net/oauth/token';
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token; // Devolver el token de acceso
  } catch (error) {
    console.error('Error obteniendo el token de acceso:', error.message);
    throw error;
  }
};

// Función para obtener los datos de mazmorras de WoW
const getDungeons = async () => {
  const accessToken = await getAccessToken(); // Obtener el token de acceso
  
  const url = 'https://us.api.blizzard.com/data/wow/journal-instance/index?namespace=static-us&locale=en_US';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    return data; // Devolver los datos de mazmorras
  } catch (error) {
    console.error('Error obteniendo datos de mazmorras:', error.message);
    throw error;
  }
};

module.exports = { getDungeons };
