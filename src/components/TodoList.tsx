import React, { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { ArrowDown } from "lucide-react";
import TodoSkeleton from "./ui/TodoSkeleton";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [queryVersion, setQueryVersion] = useState(0);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);
  const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(
    null
  ); // Track open description

  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [todoToAdd, setTodoToAdd] = useState({
    title: "",
    description: "",
  });
  const { isLoading, data } = useAuthenticationQuery({
    queryKey: ["todoList", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
  });

  if (isLoading) {
    return <TodoSkeleton />;
  }

  const onOpenEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenEditModal(true);
  };

  const onOpenConfirmModal = (todo: ITodo) => {
    setIsOpenConfirmModal(true);
    setDeleteTodoId(todo.id);
  };
  const onCloseEditModal = () => {
    setIsOpenEditModal(false);
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
  };

  const onOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const onCloseAddModal = () => {
    setTodoToAdd({
      title: "",
      description: "",
    });
    setIsOpenAddModal(false);
  };

  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
  };
  const handleShowData = (todo: ITodo) => {
    setTodoToEdit(todo);
  };
  const onChangeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTodoToEdit(() => ({
      ...todoToEdit,
      [name]: value,
    }));
  };
  const onChangeAddTodoHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTodoToAdd(() => ({
      ...todoToAdd,
      [name]: value,
    }));
  };

  const handlerDescriptionModel = (todo: ITodo) => {
    setTodoToEdit(todo);
    setOpenDescriptionId(openDescriptionId === todo.id ? null : todo.id); // Toggle description visibility
  };

  const handleClick = (todo: ITodo) => {
    handlerDescriptionModel(todo);
    handleShowData(todo);
  };
  const onRemove = async () => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${deleteTodoId}`, {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`,
        },
      });
      if (status === 200) {
        setIsDeleting(!isDeleting);
        setTodoToEdit({
          id: 0,
          title: "",
          description: "",
        });
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      closeConfirmModal();
    }
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);
    const { title, description } = todoToEdit;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      if (status === 200) {
        toast.success("Updated successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        setQueryVersion((prev) => prev + 1);
        onCloseEditModal();
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsUpdating(false);
    }
    console.log(todoToEdit);
  };
  const submitAddTodoHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsUpdating(true);
    const { title, description } = todoToAdd;
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
        { data: { title, description, user: [userData.user.id] } },
        {
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
          },
        }
      );
      console.log("userData.user.id: ", userData.user.id);
      if (status === 200) {
        toast.success("Added successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        onCloseAddModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsUpdating(false);
    }
    console.log(todoToAdd);
  };

  return (
    <div className="space-y-1  ">
      <div className="w-fit mx-auto my-10">
        <div className="flex space-x-3">
          <Button size={"sm"} onClick={onOpenAddModal}>
            Post new todo
          </Button>
        </div>
      </div>
      {data.todos.length > 0 ? (
        data.todos.map((todo: ITodo, index: number) => (
          <div key={todo.id} className="  bg-gray-100 p-3 rounded-md m-5">
            <div className="flex items-center justify-between w-full">
              <ArrowDown
                size={40}
                strokeWidth={4}
                className={` mr-2 cursor-pointer duration-300 ${
                  openDescriptionId === todo.id ? "rotate-180" : ""
                }`}
                onClick={() => handlerDescriptionModel(todo)}
              />
              <p className="cursor-pointer font-semibold mr-2">{index + 1}-</p>
              <p
                onClick={() => handleClick(todo)}
                className="w-full cursor-pointer font-semibold"
              >
                {todo.title}
              </p>
              <div className="flex items-center justify-end w-full space-x-3">
                <Button size={"sm"} onClick={() => onOpenEditModal(todo)}>
                  Edit
                </Button>
                <Button
                  variant={"danger"}
                  size={"sm"}
                  onClick={() => onOpenConfirmModal(todo)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div
              className={` ${
                openDescriptionId === todo.id ? "block" : "hidden"
              }`}
            >
              <p className="w-full duration-300 bg-gray-300 p-3 rounded-md my-3">
                {todo.description ? todo.description : "No description"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center bg-cyan-800 hover:bg-gray-100 duration-300 p-3 rounded-md text-[25px]">
          <p className="w-full font-semibold text-center">No todos</p>
        </div>
      )}
      {/* Edit Modal */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={onCloseEditModal}
        title="Edit this todo"
      >
        <form onSubmit={submitHandler}>
          <Input
            name="title"
            value={todoToEdit.title}
            onChange={onChangeHandler}
          />
          <Textarea
            name="description"
            value={todoToEdit.description || ""}
            placeholder={todoToEdit.description ? "" : "no description"}
            onChange={onChangeHandler}
          />
          <div className="flex items-center justify-end w-full space-x-3 mt-3">
            <Button fullWidth size={"sm"} isLoading={isUpdating}>
              Save
            </Button>
            <Button
              type="button"
              fullWidth
              size={"sm"}
              variant={"danger"}
              onClick={onCloseEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={isOpenAddModal}
        closeModal={onCloseAddModal}
        title="Add new todo"
      >
        <form onSubmit={submitAddTodoHandler}>
          <Input
            name="title"
            value={todoToAdd.title}
            placeholder={"write title"}
            onChange={onChangeAddTodoHandler}
          />
          <Textarea
            name="description"
            value={todoToAdd.description}
            placeholder={"write description"}
            onChange={onChangeAddTodoHandler}
          />
          <div className="flex items-center justify-end w-full space-x-3 mt-3">
            <Button fullWidth size={"sm"} isLoading={isUpdating}>
              Save
            </Button>
            <Button
              type="button"
              fullWidth
              size={"sm"}
              variant={"danger"}
              onClick={() => setIsOpenAddModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this todo from your store ?"
        description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button variant="danger" onClick={onRemove}>
            Yes , Remove
          </Button>
          <Button type="button" variant="cancel" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
