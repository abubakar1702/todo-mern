import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Todo = () => {
    const { id } = useParams()
    const [todos, setTodos] = useState([]);
    const [data, setData] = useState({ addtodo: "" });
    const [isAdding, setIsAdding] = useState(false);
    const [editTodo, setEditTodo] = useState(null);

    //show all todos
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/");
                setTodos(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, []);

    //update todo
    useEffect(() => {
        const fatchedData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/update/${id}`)
                setEditTodo(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fatchedData()
    }, [id])

    const handleButton = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        if (data.addtodo.trim() === "") {
            setIsAdding(false);
            return;
        }
        try {
            if (editTodo) {
                const response = await axios.put(`http://localhost:4000/api/update/${editTodo._id}`, { todo: data.addtodo });
                const editedTodoIndex = todos.findIndex(todo => todo._id === editTodo._id);
                const updatedTodos = [...todos];
                updatedTodos[editedTodoIndex] = response.data;
                setTodos(updatedTodos);
            } else {
                const response = await axios.post("http://localhost:4000/api/create", { todo: data.addtodo });
                setTodos([...todos, response.data]);
            }
            setData({ addtodo: "" });
        } catch (error) {
            console.log(error);
        } finally {
            setIsAdding(false);
            setEditTodo(null);
        }
    };


    const handleTextarea = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleDelete = async (todoId) => {
        try {
            await axios.delete(`http://localhost:4000/api/delete/${todoId}`);
            const updatedTodos = todos.filter(todo => todo._id !== todoId);
            setTodos(updatedTodos);
        } catch (error) {
            console.log(error);
        }
    };


    const handleEdit = (todo) => {
        setEditTodo(todo);
        setData({ addtodo: todo.todo });
    };



    return (
        <div>
            <form action="" className="flex flex-col justify-center items-center">
                <label className="text-4xl p-4" htmlFor="todo">Todos</label>
                <div className="flex flex-row justify-center">
                    <textarea onChange={handleTextarea} value={data.addtodo} className="border w-72 mx-1 p-2" name="addtodo" id="addtodo"></textarea>
                    <button className="bg-green-600 rounded-lg text-white mx-1 shadow-sm p-2" onClick={handleButton} disabled={isAdding}>
                        {editTodo ? "Save Edit" : (isAdding ? "Adding..." : "Add todo")}
                    </button>

                </div>
            </form>
            <div>
                {
                    todos.map((todo, index) => (
                        <div className="flex flex-col justify-center items-center " key={index}>
                            <p className="w-96 my-1 mx-2 border p-4 relative hover:shadow-xl">{todo.todo}
                                <div className="absolute top-0 p-1 right-0 flex">
                                    <MdDeleteForever onClick={() => handleDelete(todo._id)} style={{ marginRight: '5px', cursor: 'pointer', color: "gray" }} />
                                    <FaRegEdit onClick={() => handleEdit(todo)} style={{ cursor: 'pointer', color: "gray" }} />
                                </div>
                            </p>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Todo;
