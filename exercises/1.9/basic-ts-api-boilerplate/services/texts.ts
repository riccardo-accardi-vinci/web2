import { v4 as uuidv4 } from 'uuid';
import { TextToType } from '../types';
import { parse, serialize } from '../utils/json';
import path from 'node:path';

const jsonDbPath = path.join(__dirname, '../data/texts.json');

// Lire tous les textes
export function getAllTexts(): TextToType[] {
  return parse<TextToType>(jsonDbPath, []);
}

// Lire tous les textes filtrés par niveau
export function getTextsByLevel(level: 'easy' | 'medium' | 'hard'): TextToType[] {
  const allTexts = getAllTexts();
  return allTexts.filter(text => text.level === level);
}

// Lire un texte par ID
export function getTextById(id: string): TextToType | undefined {
  const allTexts = getAllTexts();
  return allTexts.find(text => text.id === id);
}

// Créer un nouveau texte
export function createText(content: string, level: 'easy' | 'medium' | 'hard'): TextToType {
  const allTexts = getAllTexts();
  const newText: TextToType = {
    id: uuidv4(),
    content,
    level
  };
  allTexts.push(newText);
  serialize(jsonDbPath, allTexts);
  return newText;
}

// Supprimer un texte par ID
export function deleteText(id: string): TextToType | null {
  const allTexts = getAllTexts();
  const index = allTexts.findIndex(text => text.id === id);
  
  if (index === -1) return null;

  const deletedText = allTexts.splice(index, 1)[0];
  serialize(jsonDbPath, allTexts);
  return deletedText;
}

// Remplacer un texte par un autre (PUT)
export function replaceText(id: string, content: string, level: 'easy' | 'medium' | 'hard'): TextToType | null {
  const allTexts = getAllTexts();
  const index = allTexts.findIndex(text => text.id === id);
  
  if (index === -1) return null;

  const updatedText: TextToType = { id, content, level };
  allTexts[index] = updatedText;
  serialize(jsonDbPath, allTexts);
  return updatedText;
}