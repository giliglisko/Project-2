const express = require('express');
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./model/userModel"); // Load employee model
const employeeController = require("./Controllers/employeeController"); // Load employee controller
const departmentController = require("./Controllers/departmentController"); // Load department controller
const shiftController = require("./Controllers/shiftController"); // Load shift controller
const userController = require("./Controllers/userController"); // Load user controller

const app = express();
const port = 8000;
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/FS20DB")
    .then(() => {
        console.log("Connected to DB");
        fetchAndInsertData(); // Fetch and insert data after DB connection
    })
    .catch((error) => console.error("DB connection error:", error));



// Fetch and insert data function
const fetchAndInsertData = async () => {
    try {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
        const users = resp.data;

        // Filter and map the employee data
        const filteredDataUsers = users.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            numberOfActions: 10,
            numberOfActionsLeft: 10,
        }));


        // Clear the collection before inserting new data
        await userModel.deleteMany({});



        // Insert data into MongoDB
        await userModel.insertMany(filteredDataUsers);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error fetching or inserting data:", error);
    }
};



// Endpoints
app.use("/employees", employeeController);
app.use("/departments", departmentController);
app.use("/shifts", shiftController);
app.use("/login", userController);


// Start server
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
