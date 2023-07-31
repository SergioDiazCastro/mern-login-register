import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks)
}
export const createTasks = async (req, res) => {
    const { title, description, date } = req.body

    console.log(req.user);

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    });
    const savedTask = await newTask.save();
    res.json(savedTask);    
}
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
}
export const deleteTasks = async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask) return res.status(404).json({
            status: "fail",
            message: 'Task not found'
        })
    return res.status(204).json({
        status: "success",
        data: null,
        messagge: "Task deleted"
    }); 
    }catch(error){
        return res.status(500).json({message: error.message})
    }
     
} 
export const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body)
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
}



