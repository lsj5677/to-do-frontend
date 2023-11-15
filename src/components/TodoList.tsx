import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import { TodoItem } from "./TodoItem";
import { TodoType } from "../types/todoType";
import { deleteTodo, getTodos } from "../api/todoApi";

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>();

  useEffect(() => {
    getTodosData();
  }, []);

  const getTodosData = async () => {
    await getTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  // delete from the list
  const handleDelete = async (deletedItem: TodoType) => {
    try {
      if (window.confirm("Are you sure want to delete it?")) {
        deleteTodo(deletedItem.id);
      }

      location.reload();
    } catch (err) {
      console.log(`err :: ${err}`);
      throw err;
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-[10deg] before:bg-blue-800">
          <span className="relative block text-white -skew-y-[10deg]">
            TO DO LIST
          </span>
        </h2>
      </div>
      <section className="flex flex-col bg-amber-100 p-5 w-[80vh] min-w-md max-w-xl min-h-[80vh] shadow-lg rounded-sm">
        <ul className="text-left shrink-0 max-h-[75vh] overflow-y-auto flex-auto">
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todoItem={todo} onDelete={handleDelete} />
          ))}
        </ul>
        <AddTodo />
      </section>
    </>
  );
};
