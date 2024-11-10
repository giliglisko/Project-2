const express = require("express")
const jwt = require("jsonwebtoken")
const departmentService = require("../Services/departmentService")
const router = express.Router()
router.use(express.json());





// http://localhost:8000/departments
//get all departments
router.get("/", async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments()
        return res.status(200).json({ success: true, data: departments })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})


// http://localhost:8000/departments/:id
// get department by id
router.get("/:id", async (req, res) => {
    try {
        const department = await departmentService.getDepartmentByID(req.params.id)
        return res.status(200).json({ success: true, data: department })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})


// http://localhost:8000/departments
// create department
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const department = await departmentService.createDepartment(req.body)
        return res.status(201).json({ success: true, data: department })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})



// http://localhost:8000/departments/:id
// update department
router.put("/:id", async (req, res) => {
    try {
        const department = await departmentService.updateDepartment(req.params.id, req.body)
        return res.status(200).json({ success: true, data: department })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})



// http://localhost:8000/departments/:id
// delete department
router.delete("/:id", async (req, res) => {
    try {
        const department = await departmentService.deleteDepartment(req.params.id)
        return res.status(200).json({ success: true, data: department })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})

// http://localhost:8000/departments/:id
// get department by manager id
router.get("/manager/:id", async (req, res) => {
    try {
        const department = await departmentService.getDepartmentByManagerID(req.params.id)
        return res.status(200).json({ success: true, data: department })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})





module.exports = router



















