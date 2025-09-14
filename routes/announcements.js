const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Announcement = require("../models/announcements");
const sendEventMail = require("../middleware/announcementMail");
const Subscription = require("../models/student");

router.get("/get/all", async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        return res.status(200).json({ announcements });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(400).json({ errors: [{ msg: "Announcement Not Found" }] });
        }
        return res.status(200).json({ announcement });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/create", [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("date").notEmpty().withMessage("Date is Required"),
    body("isActive").notEmpty().withMessage("isActive is Required"),
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, date, expiryTime, isActive } = req.body;
        const announcement = new Announcement({
            title, description, date, expiryTime, isActive
        });
        await announcement.save();
        const students = await Subscription.find(); // array of docs
        const studentEmails = students.map(s => s.studentEmail); // extract only emails
        await sendEventMail(studentEmails, announcement);
        return res.status(200).json({ announcement, message: "Announcement Created Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update/:id", [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("date").notEmpty().withMessage("Date is Required"),
    body("isActive").notEmpty().withMessage("isActive is Required"),
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, date, expiryTime, isActive } = req.body;
        let announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(400).json({ errors: [{ msg: "Announcement Not Found" }] });
        }
        announcement.title = title;
        announcement.description = description;
        announcement.date = date;
        announcement.expiryTime = expiryTime;
        announcement.isActive = isActive;
        await announcement.save();
        const students = await Subscription.find(); // array of docs
        const studentEmails = students.map(s => s.studentEmail); // extract only emails
        await sendEventMail(studentEmails, announcement);
        return res.status(200).json({ message: "Announcement Updated Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/all", fetchUser, async (req, res) => {
    try {
        const teams = await Announcement.find();
        if (teams) {
            return res.status(400).json({ errors: [{ msg: "No Announcements Exists" }] });
        }
        await Announcement.deleteMany({});
        return res.status(200).json({ message: "All Announcements Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(400).json({ errors: [{ msg: "Announcement Not Found" }] });
        }
        await announcement.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Announcement Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})



module.exports = router;