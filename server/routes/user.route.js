import express, { Router } from "express"
import { allTodos, createTodo, deleteTodo, editTodo } from "../controller/user.controller.js"
const app = express()
const route = express.Router()

route.get("/", allTodos)
route.post("/create", createTodo)
route.put("/update/:id", editTodo)
route.delete("/delete/:id", deleteTodo)
export default route