const {
    createCharacter,
    getCharactersByUserId,
    updateCharacter,
    deleteCharacter
  } = require('../Models/characterModel');
  
  const create = async (req, res) => {
    const { name, classType, level } = req.body;
    const userId = req.user.id; 
    try {
      const characterId = await createCharacter(name, classType, level, userId);
      res.status(201).json({ message: 'Personaje creado', characterId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAll = async (req, res) => {
    const userId = req.user.id; 
    try {
      const characters = await getCharactersByUserId(userId);
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const update = async (req, res) => {
    const { characterId } = req.params; 
    const { name, classType, level } = req.body;
  
    try {
      const updated = await updateCharacter(characterId, name, classType, level);
      if (updated) {
        res.status(200).json({ message: 'Personaje actualizado' });
      } else {
        res.status(404).json({ message: 'Personaje no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const remove = async (req, res) => {
    const { characterId } = req.params;
  
    try {
      const deleted = await deleteCharacter(characterId);
      if (deleted) {
        res.status(200).json({ message: 'Personaje eliminado' });
      } else {
        res.status(404).json({ message: 'Personaje no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { create, getAll, update, remove };
  