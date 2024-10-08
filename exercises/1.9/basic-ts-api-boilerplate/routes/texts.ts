import { Router } from 'express';
import { getAllTexts, getTextsByLevel, getTextById, createText, deleteText, replaceText } from '../services/texts';


const router = Router();

// Lire tous les textes ou filtrer par niveau
router.get('/', (req, res) => {
  const { level } = req.query;

  if (level && !['easy', 'medium', 'hard'].includes(level as string)) {
    return res.status(400).json({ error: 'Invalid level' });
  }

  const texts = level 
    ? getTextsByLevel(level as 'easy' | 'medium' | 'hard') 
    : getAllTexts();

  return res.json(texts);
});

// Lire un texte par ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const text = getTextById(id);

  if (!text) {
    return res.status(404).json({ error: 'Text not found' });
  }

  return res.json(text);
});

// Créer un texte
router.post('/', (req, res) => {
  const { content, level } = req.body;

  if (!content || !['easy', 'medium', 'hard'].includes(level)) {
    return res.status(400).json({ error: 'Invalid content or level' });
  }

  const newText = createText(content, level);
  return res.status(201).json(newText);
});

// Supprimer un texte
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedText = deleteText(id);

  if (!deletedText) {
    return res.status(404).json({ error: 'Text not found' });
  }

  return res.json(deletedText);
});

// Remplacer un texte
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { content, level } = req.body;

  if (!content || !['easy', 'medium', 'hard'].includes(level)) {
    return res.status(400).json({ error: 'Invalid content or level' });
  }

  const updatedText = replaceText(id, content, level);

  if (!updatedText) {
    return res.status(404).json({ error: 'Text not found' });
  }

  return res.json(updatedText);
});

export default router;
