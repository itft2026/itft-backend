const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Team = require("../models/team");


router.get("/get/all", async (req, res) => {
    try {
        const teams = await Team.find().sort({ date: -1 });
        if (!teams) {
            return res.status(400).json({ errors: [{ msg: "Teams Not Found" }] });
        }
        return res.status(200).json({ teams });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(400).json({ errors: [{ msg: "Team Member Not Found" }] });
        }
        return res.status(200).json({ team });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/add", [
    body("rollNumber").notEmpty().withMessage("Roll Number is Required"),
    body("name").notEmpty().withMessage("Name is Required"),
    body("role").notEmpty().withMessage("Role is Required"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("gitHub").isURL().withMessage("GitHub is Required"),
    body("linkedin").isURL().withMessage("Enter a Valid URL"),
    body("portfolio").optional().isURL().withMessage("Enter a Valid URL")
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rollNumber, name, email, role, linkedin, image, gitHub, portfolio } = req.body;
        let user = await Team.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
        }
        user = new Team({
            rollNumber, name, email, role, linkedin, image, gitHub, portfolio
        });
        await user.save();
        return res.status(200).json({ user, message: "Team Member Created Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update/:id", [
    body("rollNumber").notEmpty().withMessage("Roll Number is Required"),
    body("name").notEmpty().withMessage("Name is Required"),
    body("role").notEmpty().withMessage("Role is Required"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("gitHub").isURL().withMessage("GitHub is Required"),
    body("linkedin").isURL().withMessage("Enter a Valid URL"),
    body("portfolio").optional().isURL().withMessage("Enter a Valid URL")
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rollNumber, name, email, role, linkedin, image, gitHub, portfolio } = req.body;
        let user = await Team.findById({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "User Not Exists" }] });
        }
        user.name = name;
        user.email = email;
        user.role = role;
        user.linkedin = linkedin;
        user.image = image;
        user.gitHub = gitHub;
        user.portfolio = portfolio;
        user.rollNumber = rollNumber;
        await user.save();
        return res.status(200).json({ user, message: "Team Member Updated Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/all", fetchUser, async (req, res) => {
    try {
        const teams = await Team.find();
        if (teams) {
            return res.status(400).json({ errors: [{ msg: "No Team Members Found" }] });
        }
        await Team.deleteMany({});
        return res.status(200).json({ message: "All Team Members Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
)

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(400).json({ errors: [{ msg: "Team Member Not Found" }] });
        }
        await team.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Team Member Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})



module.exports = router;