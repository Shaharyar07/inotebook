const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Get all the notes using GET: api/notes/getallnotes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

// Add the notes using post: api/notes/addnote

router.post(
  "/addnote",
  [
    body("title", "Enter a valid Title ").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description is too short, Enter a valid name!"
    ).isLength({ min: 3 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors then throw a bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured");
    }
  }
);

//Update the existing note using Post '/api/notes/updatenote' login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create new note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  //find the note to be updated
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

//Delete the existing note using Post '/api/notes/deletenote' login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //find the note to be updated
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted!", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});
module.exports = router;
