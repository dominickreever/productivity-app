import React, { useState } from "react";

export default function Form(props) {

    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            props.addTask(name);
            setName(""); 
        }
       
    }

    return (
        <form className="temp" onSubmit={handleSubmit}>
          <input type="text" id="new-todo-input" name="text" autoComplete="off" value={name} onChange={handleChange} />
          <button type="submit">Write Task</button>
        </form>
    );
  }