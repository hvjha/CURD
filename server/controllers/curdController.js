import { User } from "../models/userModels.js"

export const read = async (req, res) => {
    try {
        const data = await User.find({})
        res.json({ success: true, data: data })
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ success: false, message: "Error fetching data" });
    }
}

export const create = async(req,res)=>{
    try {
        // console.log(req.body);
        const data = new User(req.body)
        await data.save();
        res.send({message:"data created successfully", success:true, data : data})
        
    } catch (error) {
        console.error("Error creating data:", error);
        res.status(500).json({ success: false, message: "Error creating data" });
    }
}

export const update = async(req,res)=>{
    try {
        // console.log(req.body);
        const {_id,...rest} = req.body
        const data = await User.updateOne({_id: _id}, rest)
        res.send({success:true, message : "data updated successfully", data : data})
        
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ success: false, message: "Error updating data" });
    }
}

export const remove = async(req,res)=>{
    try {
        const {id} = req.params
        const data = await User.deleteOne({_id : id})
        if (data.deletedCount === 0) {
            // Handle case where no document was found with the provided ID
            return res.status(404).json({ success: false, message: "Data not found" });
        }
        res.send({success:true, message:"Data deleted successfully",data:data})
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ success: false, message: "Error deleting data" });
    }
}