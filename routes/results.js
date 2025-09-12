const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Result = require("../models/result");

router.get("/get/all", async (req, res) => {
    try {
        const results = await Result.find().sort({ date: -1 });
        if (!results) {
            return res.status(400).json({ errors: [{ msg: "Results Not Found" }] });
        }
        return res.status(200).json({ results });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get("/get/:id", async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(400).json({ errors: [{ msg: "Result Not Found" }] });
        }
        return res.status(200).json({ result });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/create", [
    body("eventID").notEmpty().withMessage("Event ID is Required"),
    body("eventName").notEmpty().withMessage("Event Name is Required"),
    body("winner").notEmpty().withMessage("Winner is Required"),
    body("runnerUp").notEmpty().withMessage("Runner Up is Required"),
    body("eventsImages").notEmpty().withMessage("Events Images is Required"),
    body("resultSheet").notEmpty().withMessage("Result Sheet is Required"), ,
    body("date").notEmpty().withMessage("Date is Required"),
    body("noOfParticipants").notEmpty().withMessage("Number of Participants is Required"),
    body("video").notEmpty().withMessage("Video is Required"),
    body("venue").notEmpty().withMessage("Venue is Required"),
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { eventID, eventName, winner, runnerUp, eventsImages, resultSheet, date, noOfParticipants, video, venue } = req.body;
        const result = new Result({
            eventID, eventName, winner, runnerUp, eventsImages, resultSheet, date, noOfParticipants, video, venue
        });
        await result.save();
        return res.status(200).json({ result, message: "Result Created Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", errors);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/update/:id", fetchUser, async (req, res) => {
    /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }*/

    try {
        const { eventID, eventName, winner, runnerUp, eventsImages, resultSheet, date, noOfParticipants, video, venue } = req.body;

        const isThere = await Result.findById(req.params.id);
        if (!isThere) {
            return res.status(404).json({ error: "Result Not Found" });
        }
        const result = new Result({
            eventID, eventName, winner, runnerUp, eventsImages, resultSheet, date, noOfParticipants, video, venue
        });
        await result.save();
        return res.status(200).json({ result, message: "Result Updated Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/all", fetchUser, async (req, res) => {
    try {
        const teams = await Result.find();
        if (teams) {
            return res.status(400).json({ errors: [{ msg: "No Results Exists" }] });
        }
        await Result.deleteMany({});
        return res.status(200).json({ message: "All Results Deleted Successfully" });
    }
    catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(400).json({ errors: [{ msg: "Result Not Found" }] });
        }

        await result.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Result Deleted Successfully" });
    } catch (errors) {
        console.log("------------------INTERNAL SERVER ERROR------------------", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})




module.exports = router; 