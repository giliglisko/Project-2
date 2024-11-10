const userModel =  require("../model/userModel")



const login = async (user) => { 
     const userFound = await userModel.findOne({ username: user.username, email: user.email })
        if(userFound){
            return userFound
        }
        else{
            return false
        }
}


const getAllUsers = async () => {
    return await userModel.find({})

}

const getUserByID = async (id) => {
    const user = await userModel.findById(id)
    if(!user){
        return false
    }
    return user
}

const decreaseNumberOfActionsLeft = async (id) => {
    const user = await userModel.findById(id)
    if(!user){
        return false
    }
    user.numberOfActionsLeft -= 1
    await user.save()
    return user
}





module.exports = {login, getAllUsers, getUserByID, decreaseNumberOfActionsLeft}