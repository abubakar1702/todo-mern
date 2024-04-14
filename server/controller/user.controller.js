import todos from "../model/user.model.js";

export const allTodos = async (req, res) => {
  try {
    const all_todos = await todos.find();

    if (!all_todos) {
      return res.status(500).json({ msg: "something went wrong" });
    }
    res.status(200).json(all_todos);
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (req, res) => {
  try {
    const userData = new todos(req.body);

    if(!userData){
        return res.status(500).json({msg: "something went wrong"})
    }
    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.log(error);
  }
};

export const editTodo = async(req, res)=>{
    try {
        const id = req.params.id
        const todoExists = await todos.findById(id)
        if(!todoExists){
            return res.status(404).json({msg: "todo not found!"})
        }
        const updatedTodo = await todos.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updatedTodo)
    } catch (error) {
        console.log(error);
    }
};

export const deleteTodo=async(req, res)=>{
    try {
        const id = req.params.id
        const data = await todos.findById(id)
        if(!data){
            return res.status(400).json("todo not found!")
        }

        await todos.findByIdAndDelete(id)
        res.status(200).json({msg: "todo has been deleted successfully"})
    } catch (error) {
        console.log(error)
    }
}
