const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const secret = process.env.JWT_SECRET;

router.post("/login", [
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const data = {
            userId: user._id,
            name: user.name,
            email: user.email,
        }

        const authToken = jwt.sign(data, secret);
        res.status(200).json({ authToken, message: "Logged In Successfully" });
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})

router.post("/register", [
    body("name").notEmpty().withMessage("Enter a Valid Name"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("role").notEmpty().withMessage("Role is required")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password, role } = req.body;
        let admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new Admin({
            name, email, password: hashedPassword
        });

        await admin.save();

        const data = {
            userId: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        }

        const authToken = jwt.sign(data, secret);
        res.status(200).json({ message: "Registered Successfully" });

    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})


router.put("/updateadmin/:id", [
    body("name").notEmpty().withMessage("Enter a Valid Name"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("role").notEmpty().withMessage("Role is required")
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const adminId = req.params.id;
        const { name, email, password, role } = req.body;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        admin.name = name;
        admin.email = email;
        admin.password = hashedPassword;
        admin.role = role;

        await admin.save();
        res.status(200).json({ admin, message: "Admin updated successfully" });
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})

router.get("/getadmins", fetchUser, async (req, res) => {
    try {
        const admins = await Admin.find().select("-password");
        res.status(200).json(admins);
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})

router.get("/getadmin/:id", fetchUser, async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById(adminId).select("-password");
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})



router.delete("/deleteadmin/:id", fetchUser, async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByIdAndDelete(adminId);
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }
        res.status(200).json({ msg: "Admin deleted successfully" });
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})

router.delete("/deleteadmins", async (req, res) => {
    try {
        const admins = await Admin.find();
        if(admins) {
            res.status(200).json({ msg: "No admins exists" });
        }
        await Admin.deleteMany({});
        res.status(200).json({ msg: "All admins deleted successfully" });
    } catch (error) {
        console.error("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json(error, "Internal Server Error");
    }
})


module.exports = router