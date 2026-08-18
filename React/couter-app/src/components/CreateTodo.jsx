import { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createTodos() {
    try {
      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {"Content-Type": "application/json"},
      });
      

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      alert("Todo added successfully!");
      // Clear inputs
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Error occurred: " + error.message);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={createTodos}>Add todo</button>
    </div>
  );
};

export default CreateTodo;