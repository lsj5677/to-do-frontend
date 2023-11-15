import { AiFillDelete } from "react-icons/ai";
import { TodoType } from "../types/todoType";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateTodo } from "../api/todoApi";

type todoItemType = {
  todoItem: TodoType;
  onDelete: (e: any) => void;
};

export const TodoItem = ({ todoItem, onDelete }: todoItemType) => {
  const { id, task } = todoItem;

  const formik = useFormik({
    initialValues: { ...todoItem },
    validationSchema: Yup.object({
      task: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(30, "Must be 30 characters or less")
        .required(),
    }),
    onSubmit: async (values) => {
      console.log(`values:: ${values}`);
      try {
        return await updateTodo(values.id, values);
      } catch (err) {
        console.log(`error updating todo`);
      }
    },
  });

  // delete
  const handleDelete = () => onDelete(todoItem);

  return (
    <li
      key={id}
      className="flex text-lg leading-10 border-b border-gray-300 items-center p-2"
    >
      <label
        htmlFor={id}
        className="flex-auto shrink-0 pl-2 checked:line-through peer-checked/checked:text-slate-300 peer-checked/checked:line-through"
      >
        {task}
      </label>
      <div className={`flex gap-2 `}>
        <button onClick={handleDelete} className="p-1 my-2 bg-gray-200">
          <AiFillDelete />
        </button>
      </div>
    </li>
  );
};
