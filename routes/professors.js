const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Professor = require("../models/professor");

router.get("/get/all", async (req, res) => {
    try {
        const faculties = await Professor.find().sort({ date: -1 });
        if (!faculties) {
            return res.status(400).json({ errors: [{ msg: "Faculties Not Found" }] });
        }
        return res.status(200).json({ faculties });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const faculty = await Professor.findById(req.params.id);
        if (!faculty) {
            return res.status(400).json({ errors: [{ msg: "Faculty Not Found" }] });
        }
        return res.status(200).json({ faculty });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

})

router.post("/add", [
    body("name").notEmpty().withMessage("Name is Required"),
    body("designation").notEmpty().withMessage("Designation is Required"),
    body("department").notEmpty().withMessage("Department is Required"),
    body("experience").notEmpty().withMessage("Experience is Required"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("linkedIn").notEmpty().withMessage("LinkedIn Profile is Required"),
    body("googleScholar").optional(),
    body("message").optional()
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, designation, department, experience, email, image, linkedIn, googleScholar, message } = req.body;
        let professor = await Professor.findOne({ email });
        if (professor) {
            return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
        }
        professor = new Professor({
            name, designation, department, experience, email, image, linkedIn, googleScholar, message
        });
        await professor.save();
        return res.status(200).json({ message: "Professor Created Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update/:id", [
    body("name").notEmpty().withMessage("Name is Required"),
    body("designation").notEmpty().withMessage("Designation is Required"),
    body("department").notEmpty().withMessage("Department is Required"),
    body("experience").notEmpty().withMessage("Experience is Required"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("linkedIn").notEmpty().withMessage("LinkedIn Profile is Required"),
    body("googleScholar").optional(),
    body("message").optional()
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, designation, department, experience, email, image, linkedIn, googleScholar, message } = req.body;
        let professor = await Professor.findById({ _id: req.params.id });
        if (!professor) {
            return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
        }
        professor.name = name;
        professor.designation = designation;
        professor.experience = experience;
        professor.department = department;
        professor.email = email;
        professor.image = image;
        professor.linkedIn = linkedIn;
        professor.googleScholar = googleScholar;
        professor.message = message;
        await professor.save();
        return res.status(200).json({ message: "Professor Updated Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/all", fetchUser, async (req, res) => {
    try {
        const professors = await Professor.find();
        if(professors){
            return res.status(400).json({ errors: [{ msg: "No Professors Found" }] });
        }
        await Professor.deleteMany({});
        return res.status(200).json({ message: "All Professors Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);
        if (!professor) {
            return res.status(400).json({ errors: [{ msg: "Professor Not Found" }] });
        }
        await professor.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Professor Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})




module.exports = router;