const express = require("express")
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Event = require("../models/event");
const sendEventMail = require("../middleware/eventMail");
const Student = require("../models/student");

router.get("/get/all", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        return res.status(200).json({ events });
    } catch (error) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(400).json({ errors: [{ msg: "Event Not Found" }] });
        }
        return res.status(200).json({ event });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/create", [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("date").notEmpty().withMessage("Date is Required"),
    body("location").notEmpty().withMessage("Location is Required"),
    body("poster").notEmpty().withMessage("Poster is Required"),
    body("registrationLink").notEmpty().withMessage("Registration Link is Required"),
    body("type").notEmpty().withMessage("Type is Required"),
    body("status").notEmpty().withMessage("Status is Required"),
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, date, location, poster, registrationLink, status, type } = req.body;
        const link = await Event.findOne({ registrationLink });
        if (link) {
            return res.status(400).json({ errors: [{ msg: "Registration Link Already Exists" }] });
        }
        const event = new Event({
            title, description, date, location, poster, registrationLink, status, type
        });
        await event.save();
        const students = await Students.find(); // array of docs
         const studentEmails = students.map(s => s.email); // extract only emails
 
         await sendEventMail(studentEmails, event); // pass array of emails

        return res.status(200).json({ message: "Event Created Successfully" });
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update/:id", [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("date").notEmpty().withMessage("Date is Required"),
    body("location").notEmpty().withMessage("Location is Required"),
    body("poster").notEmpty().withMessage("Poster is Required"),
    body("registrationLink").notEmpty().withMessage("Registration Link is Required"),
    body("type").notEmpty().withMessage("Type is Required"),
    body("status").notEmpty().withMessage("Status is Required"),
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, date, location, poster, registrationLink, status, type } = req.body;
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(400).json({ errors: [{ msg: "Event Not Found" }] });
        }
        event.title = title;
        event.description = description;
        event.date = date;
        event.location = location;
        event.poster = poster;
        event.registrationLink = registrationLink;
        event.status = status;
        event.type = type;
        await event.save();
        const students = await Student.find(); // array of docs
        const studentEmails = students.map(s => s.email); // extract only emails

        await sendEventMail(studentEmails, event); // pass array of emails
        return res.status(200).json({ message: "Event Updated Successfully" });
    } catch (error) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/all", async (req, res) => {
   // console.log("DELETE /delete/all hit!");
    try {
        const teams = await Event.find();
        if (teams) {
            return res.status(400).json({ errors: [{ msg: "No Events Found" }] });
        }
        const result = await Event.deleteMany({});
        res.status(200).json(result);
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(400).json({ errors: [{ msg: "Event Not Found" }] });
        }
        await event.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Event Deleted Successfully" });
    } catch (error) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})



module.exports = router;