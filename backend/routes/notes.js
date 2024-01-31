const express = require("express");
const router = express.Router();
const fetchuser = require("../middelware/fetchuser");
const Note = require("../models/Note");
const Monthly = require("../models/Monthly");
const Yearly = require("../models/Yearly");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get daily the tasks using: GET "/api/auth/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    const tags = notes.map((note) => note.tag);
    const responseObj = {
      notes: notes,
      tags: tags,
    };

    res.json(responseObj);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 2: Get monthly  tasks using: GET "/api/auth/fetchallmonthly". Login required
router.get("/fetchallmonthly", fetchuser, async (req, res) => {
  try {
    const notes = await Monthly.find({ user: req.user.id });
    const tags = notes.map((note) => note.tag);
    const responseObj = {
      notes: notes,
      tags: tags,
    };
    res.json(responseObj);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 2: Get yearly  tasks using: GET "/api/auth/fetchallyearly". Login required
router.get("/fetchallyearly", fetchuser, async (req, res) => {
  try {
    const notes = await Yearly.find({ user: req.user.id });
    const tags = notes.map((note) => note.tag);
    const responseObj = {
      notes: notes,
      tags: tags,
    };
    res.json(responseObj);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 3: Add a new daily Note using: POST "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const { title, description, tag, deadline, deadlinetime } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
        deadline: deadline,
        deadlinetime: deadlinetime,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }
);

// ROUTE 4: Add monthly task using: POST "/api/auth/addMonthlytask". Login required
router.post(
  "/addMonthlytask",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const { title, description, tag, deadline, deadlinetime } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const Monthlytask = new Monthly({
        title,
        description,
        tag,
        user: req.user.id,
        deadline: deadline,
        deadlinetime: deadlinetime,
      });
      const savedNote = await Monthlytask.save();
      console.log(savedNote);
      console.log("Saved monthly note ");
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Internal Server Error : ${error.message}`);
    }
  }
);

// ROUTE 4: Add yearly task using: POST "/api/auth/addyearlytask". Login required
router.post(
  "/addyearlytask",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, deadline } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const yearlytask = new Yearly({
        title,
        description,
        tag,
        user: req.user.id,
        deadline: deadline,
      });
      const savedNote = await yearlytask.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Internal Server Error : ${error.message}`);
    }
  }
);

// ROUTE 5: Update an existing daily Note using: POST "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  console.log("this is the request ", req.body);
  const { title, description, tag, deadline, deadlinetime } = req.body;
  try {
    // Create a newNote object
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
    if (deadline) {
      newNote.deadline = deadline;
    }
    if (deadlinetime) {
      newNote.deadlinetime = deadlinetime;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 5: Update an existing monthly task using: POST "/api/notes/updatenote". Login required
router.put("/updateMonthly/:id", fetchuser, async (req, res) => {
  const { title, description, tag, deadline } = req.body;

  try {
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
    if (deadline) {
      newNote.deadline = deadline;
    }

    const note = await Monthly.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updatedNote = await Monthly.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note: updatedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 5: Update an existing yearly task using: Put "/api/notes/updateYearly". Login required
router.put("/updateYearly/:id", fetchuser, async (req, res) => {
  const { title, description, tag, deadline } = req.body;

  try {
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
    if (deadline) {
      newNote.deadline = deadline;
    }

    const note = await Yearly.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updatedNote = await Yearly.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note: updatedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 6: Delete an existing daily task using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 6: Delete an existing Monthly task using: DELETE "/api/notes/deleteMonthly". Login required
router.delete("/deleteMonthly/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Monthly.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Monthly.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// ROUTE 6: Delete an existing Yearly task using: DELETE "/api/notes/deleteYearly". Login required
router.delete("/deleteYearly/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Yearly.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Yearly.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

module.exports = router;
