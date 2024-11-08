import express from "express";
import { Note } from "../models/noteModel.js";
import { protect } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

//not yarat
router.post('/', protect, async (req, res) => {
   try {
      const newNote = {
         user: req.user,  
         title: req.body.title,
         text: req.body.text,
      };

      const note = await Note.create(newNote);
      return res.status(201).send(note);
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});

//tüm notları listele
router.get('/', protect, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user });

      return res.status(200).json({
         count: notes.length,
         data: notes
      });
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});

//not bul
router.get('/:id', protect, async (req, res) => {
   try {
      const note = await Note.findById(req.params.id);

      if (!note) {
         return res.status(404).json({ message: 'Note not found' });
      }

      if (note.user.toString() !== req.user) {
         return res.status(401).json({ message: 'Not authorized to view this note' });
      }

      return res.status(200).json(note);
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});

//not değiştir
router.put('/:id', protect, async (req, res) => {
   try {
      if (!req.body.title || !req.body.text) {
         return res.status(400).send({ message: 'Please provide all necessary fields' });
      }

      const note = await Note.findById(req.params.id);

      if (!note) {
         return res.status(404).json({ message: 'Note not found' });
      }

      if (note.user.toString() !== req.user) {
         return res.status(401).json({ message: 'Not authorized to update this note' });
      }

      note.title = req.body.title;
      note.text = req.body.text;

      await note.save();
      return res.status(200).json({ message: 'Note updated successfully' });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
});

//not silme
router.delete('/:id', protect, async (req, res) => {
   try {
      const { id } = req.params;

      const note = await Note.findById(id);

      if (!note) {
         return res.status(404).json({ message: 'Note not found' });
      }

      if (note.user.toString() !== req.user) {
         return res.status(401).json({ message: 'Not authorized to delete this note' });
      }

      await note.deleteOne();

      return res.status(200).send({ message: 'Note deleted successfully' });
   } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
   }
});

export default router