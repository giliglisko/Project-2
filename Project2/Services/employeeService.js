const employeeModel =  require("../model/employeeModel")









const getAllEmployees = async () => {
    return await employeeModel.find({})
}


const getEmployeeById = async (id) => {
    return await employeeModel.findById(id)
}


const createEmployee = async (employee) => {
    const newEmployee = new employeeModel(employee)
    await newEmployee.save()
    return "Created!"
}



const updateEmployee = async (id, newEmployeeData) => {
    await employeeModel.findByIdAndUpdate(id, newEmployeeData)
    return "Updated"
}

const deleteEmployee = async (id) => {
    await employeeModel.findByIdAndDelete(id)
    return "Deleted"
}

module.exports = {getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee}

