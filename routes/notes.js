import express from 'express';

import { createNote, deleteNote, getNotes, updateNote } from '../controllers/notes.js';

import auth from "../middleware/auth.js";


const router = express.Router();

// router.get('/', auth, getNotes);
// router.post('/', auth, createNote);
// router.patch('/:id', auth, updateNote);
// router.delete('/:id', auth, deleteNote);
router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;