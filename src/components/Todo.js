import React, { useState } from "react";

export default function Todo(props) {

    const [isEditing, setEditing] = useState(false);

    const [newName, setNewName] = useState("");

    function handleChange(e) {
      setNewName(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }

    const editingTemplate = (
      <form className="temp" onSubmit={handleSubmit}>
        <div>
          <label htmlFor={props.id}>New name for {props.name}</label>
          <input id={props.id} type="text" value={newName} onChange={handleChange} />
        </div>
        <div className="temp-btns">
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    );

    const viewTemplate = (
      <div className="temp">
        <div>
            <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
            <label htmlFor={props.id}>{props.name}</label>
          </div>
          <div className="temp-btns">
            <button type="button" onClick={() => setEditing(true)}>Edit</button>
            <button type="button" onClick={() => props.deleteTask(props.id)}>Erase</button>
          </div>
      </div>
    );

    return (
        <li className="tasklist-item">{isEditing ? editingTemplate : viewTemplate}</li>
    );
  }