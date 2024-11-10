const departmentModel =  require("../model/departmentModel")






const getAllDepartments = async () => {
    return await departmentModel.find({})
}


const getDepartmentByID = async (id) => {
    return await departmentModel.findById(id)
}


const createDepartment = async (department) => {
    const newDepartment = new departmentModel(department)
    await newDepartment.save()
    return "Created!"
}



const updateDepartment = async (id, newDepartmentData) => {
    await departmentModel.findByIdAndUpdate(id, newDepartmentData)
    return "Updated"
}

const deleteDepartment = async (id) => {
    await departmentModel.findByIdAndDelete(id)
    return "Deleted"
}

const getDepartmentByManagerID = async (id) => {
    const department = await departmentModel.find({manager: id})
    if(department.length === 0){
        return false
    }
    return department
}

module.exports = {getAllDepartments, getDepartmentByID, createDepartment, updateDepartment, deleteDepartment , getDepartmentByManagerID}

