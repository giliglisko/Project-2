const shiftModel =  require("../model/shiftModel")








const getAllShifts = async () => {
    return await shiftModel.find({})
}

const getShiftByID = async (id) => { 
    const shift = await shiftModel.findById(id)
    if(!shift){
        return false
    }
    return shift
}



const getShiftByEmployeeID = async (id) => {
    const shift = await shiftModel.find({ employees: { $in: [id] } });
    
    if (shift.length === 0) {
        return false;
    }
    return shift;
}



const createShift = async (shift) => {
    const newShift = new shiftModel(shift)
    await newShift.save()
    return "Created!"
}



const updateShiftEmployees= async(shiftId, employeeId) =>{
    return await shiftModel.findByIdAndUpdate(
        shiftId,
        { $addToSet: { employees: employeeId } },  
        { new: true }  
    );
}


const deleteShiftEmployee = async (shiftId, employeeId) => {
    return await shiftModel.findByIdAndUpdate ( 
        shiftId,
        { $pull: { employees: employeeId } },
        { new: true }
    );
}


const updateShift = async (id, shift) => {
    return await shiftModel.findByIdAndUpdate(id, shift, {new: true})
}






module.exports = {getAllShifts, createShift, updateShiftEmployees, getShiftByEmployeeID, getShiftByID, updateShift, deleteShiftEmployee}