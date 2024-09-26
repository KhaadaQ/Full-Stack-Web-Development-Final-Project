const express = require('express');
const { getDungeons } = require('../Services/wowService');

const router = express.Router();

// Ruta para obtener mazmorras de WoW
router.get('/dungeons', async (req, res) => {
  try {
    const dungeons = await getDungeons();
    res.status(200).json(dungeons);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mazmorras' });
  }
});

module.exports = router;
