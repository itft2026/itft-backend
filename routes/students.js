const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Students = require("../models/student");
const fetchUser = require("../middleware/fetchUser");


router.get("/get/all", async (req, res) => {
    try {
        const students = await Students.find().sort({ date: -1 });
        if (!students) {
            return res.status(400).json({ errors: [{ msg: "Students Not Found" }] });
        }
        return res.status(200).json({ students });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);
        if (!student) {
            return res.status(400).json({ errors: [{ msg: "Student Not Found" }] });
        }
        return res.status(200).json({ student });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/add", [
    body("regno").notEmpty().withMessage("Registration Number is Required"),
    body("name").notEmpty().withMessage("Name is Required"),
    body("year").notEmpty().withMessage("Year is Required"),
    body("section").notEmpty().withMessage("Section is Required"),
    body("studentEmail").isEmail().withMessage("Enter a Valid Email"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("linkedin").notEmpty().withMessage("LinkedIn Profile is Required"),
    body("github").notEmpty().withMessage("GitHub Profile is Required"),
    body("personalEmail").isEmail().withMessage("Enter a Valid Personal Email"),
    body("portfolio").optional().isURL().withMessage("Enter a Valid Portfolio URL")
],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { regno, name, year, section, studentEmail, image, linkedin, github, personalEmail, portfolio } = req.body;
        const user = await Students.findOne({ studentEmail });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
        }
        const Student = new Students({
            regno, name, year, section, studentEmail, image, linkedin, github, personalEmail, portfolio
        });
        await Student.save();
        return res.status(200).json({ Student, message: "Student Created Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update/:id", [
    body("regno").notEmpty().withMessage("Registration Number is Required"),
    body("name").notEmpty().withMessage("Name is Required"),
    body("year").notEmpty().withMessage("Year is Required"),
    body("section").notEmpty().withMessage("Section is Required"),
    body("studentEmail").isEmail().withMessage("Enter a Valid Email"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("linkedin").notEmpty().withMessage("LinkedIn Profile is Required"),
    body("github").notEmpty().withMessage("GitHub Profile is Required"),
    body("personalEmail").isEmail().withMessage("Enter a Valid Personal Email"),
    body("portfolio").optional().isURL().withMessage("Enter a Valid Portfolio URL")
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { regno, name, year, section, studentEmail, image, linkedin, github, personalEmail, portfolio } = req.body;
        const user = await Students.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "User is Not Found" }] });
        }
        user.regno = regno;
        user.name = name;
        user.year = year;
        user.section = section;
        user.studentEmail = studentEmail;
        user.image = image;
        user.linkedin = linkedin;
        user.github = github;
        user.personalEmail = personalEmail;
        user.portfolio = portfolio;
        await user.save();
        return res.status(200).json({ user, message: "Student Updated Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/all", async (req, res) => {
    try {
        const teams = await Students.find();
        if (teams) {
            return res.status(400).json({ errors: [{ msg: "No Students Exists" }] });
        }
        await Students.deleteMany({});
        return res.status(200).json({ message: "All Students Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);
        if (!student) {
            return res.status(400).json({ errors: [{ msg: "Student Not Found" }] });
        }
        await Students.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Student Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;