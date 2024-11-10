const express = require("express")
const jwt = require("jsonwebtoken")
const shiftService = require("../Services/shiftServices")
const router = express.Router()
router.use(express.json());




// http://localhost:8000/shifts
//get all shifts
router.get("/", async (req, res) => {
    try {
        const shifts = await shiftService.getAllShifts()
        return res.status(200).json({ success: true, data: shifts })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})

// http://localhost:8000/shifts/:id
// get shift by id
router.get("/:id", async (req, res) => {
    try {
        const shift = await shiftService.getShiftByID(req.params.id)
        if(!shift){
            return res.status(500).json({ success: false, error: "Shift not found" })
        }
        return res.status(200).json({ success: true, data: shift })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})




// http://localhost:8000/shifts/employee/:id
// get shift by employee id
router.get("/employee/:id", async (req, res) => {
       const shift = await shiftService.getShiftByEmployeeID(req.params.id)
       if(!shift){
        return res.status(500).json({ success: false, error: "No shifts found" })
    }
        return res.status(200).json({ success: true, data: shift })
})
    
      
    



// http://localhost:8000/shifts
// create shift
router.post("/", async (req, res) => {
    try {
        const shift = await shiftService.createShift(req.body)
        return res.status(201).json({ success: true, data: shift })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
})

// http://localhost:8000/shifts/updateEmployee/:id
// update employees in a shift
router.put("/updateEmployee/:id", async (req, res) => {
    try {
        const shift = await shiftService.updateShiftEmployees(req.params.id, req.body.employeeId);
        return res.status(200).json({ success: true, data: shift });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
});


// http://localhost:8000/shifts/deleteEmployee/:id
// delete employee from shift
router.put("/deleteEmployee/:id", async (req, res) => {
    try {
        const shift = await shiftService.deleteShiftEmployee(req.params.id, req.body.employeeId);
        return res.status(200).json({ success: true, data: shift });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
    }
});


// http://localhost:8000/shifts/:id
// update shift
router.put("/:id", async (req, res) => {
    try {
        const shift = await shiftService.updateShift(req.params.id, req.body)
        return res.status(200).json({ success: true, data: shift })
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
 })








module.exports = router



















