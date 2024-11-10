const express = require("express")
const jwt = require("jsonwebtoken")
const userService = require("../Services/userService")
const fs = require('fs');
const path = require('path');
const router = express.Router()
router.use(express.json())


let blockedUsers = {};  


// http://localhost:8000/login
// login
router.post("/", async (req, res) => {
    try {
        const user = await userService.login(req.body)


             if (blockedUsers[user.id] && new Date(blockedUsers[user.id].blockUntil) > new Date()) {
                return res.status(403).json({
                    success: false,
                    error: "Out of actions for today! Please try again tomorrow."
                });
            }


        if (user) {
            const token = jwt.sign({ id:user.name }, "secretkey")
            return res.status(200).json({ success: true, data: user, token }) // Include token in the response
        }
        return res.status(401).json({ success: false, error: "Invalid credentials" })
    } catch (e) {
        return res.status(500).json({ success: false, error: `An error occurred: ${e.message}` })
    }
})

// http://localhost:8000/login/users
// get all users
router.get("/users", async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        return res.status(200).json({ success: true, data: users })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})



// http://localhost:8000/login/users/:id    
// Decrease number of actions left by 1 and log the action
router.put("/users/:id", async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Decrease the number of actions left
        user.numberOfActionsLeft -= 1;

        // If numberOfActionsLeft becomes 0, block the user for 24 hours
        if (user.numberOfActionsLeft === 0) {
            const blockUntil = new Date();
            blockUntil.setHours(blockUntil.getHours() + 24); // Block for 24 hours

            // Add the user to the blocked users list if not already blocked
            if (!blockedUsers[user.id]) {
                blockedUsers[user.id] = { blockUntil: blockUntil.toISOString() };
            }
        }

        // Save the updated user
        await user.save();

        // Log the action
        const logEntry = {
            userId: req.params.id,
            time: new Date().toLocaleString(),
            actionsLeft: user.numberOfActionsLeft
        };

        const logFilePath = path.join(__dirname, '../actionLogs.json');

        // Use fs.promises API or async/await for better async handling
        try {
            const data = await fs.promises.readFile(logFilePath, 'utf8');
            let logs = [];
            if (data) {
                logs = JSON.parse(data);
            }

            logs.push(logEntry);
            await fs.promises.writeFile(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
        } catch (err) {
            console.error("Error reading or writing log to file", err);
        }

        return res.status(200).json({ success: true, data: user });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
});

















module.exports = router
