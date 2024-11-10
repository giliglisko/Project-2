const express = require("express")
const jwt = require("jsonwebtoken")
const employeeService = require("../Services/employeeService")
const router = express.Router()
router.use(express.json());



// http://localhost:8000/employees
//get all employees
router.get("/", async (req, res) => {
    try {
        const employee = await employeeService.getAllEmployees()
        return res.status(200).json({ success: true, data: employee })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})



// http://localhost:8000/employees/:id
// get employee by id
router.get("/:id", async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id)
        return res.status(200).json({ success: true, data: employee })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})


// http://localhost:8000/employees
// create employee
router.post("/", async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body)
        return res.status(201).json({ success: true, data: employee })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})


// http://localhost:8000/employees/:id
// update employee
router.put("/:id", async (req, res) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body)
        return res.status(200).json({ success: true, data: employee })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})


// http://localhost:8000/employees/:id
// delete employee
router.delete("/:id", async (req, res) => {
    try {
        const employee = await employeeService.deleteEmployee(req.params.id)
        return res.status(200).json({ success: true, data: employee })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})




module.exports = router



















