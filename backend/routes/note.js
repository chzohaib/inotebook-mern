const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ========================================================================
// ROUTE 1: Get all notes - GET "/api/notes/fetchallnotes" (Login required)
// ========================================================================
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ========================================================================
// ROUTE 2: Add a new note - POST "/api/notes/addnote" (Login required)
// ========================================================================
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Create and save new note
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
            res.status(500).send("Internal Server Error");
        }
    }
);

// ========================================================================
// ROUTE 3: Update an existing note - PUT "/api/notes/updatenote/:id" (Login required)
// ========================================================================
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Prepare updated fields
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // Find the note to update
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        // Security check: only owner can update
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update note and return new document
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ========================================================================
// ROUTE 4: Delete an existing note - DELETE "/api/notes/deletenote/:id" (Login required)
// ========================================================================
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        // Allow deletion only by owner
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted", note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;