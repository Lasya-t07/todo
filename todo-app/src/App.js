import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App=()=>{
  const [tasks,setTasks]=useState([]);
  const [task,setTask]=useState('');
  useEffect(()=>{
    axios.get('http://localhost:3000/tasks')
      .then(response=> setTasks(response.data))
      .catch(error=>console.error('Error: ',error))
  },[]);
  const addTask=()=>{
    if (!task) return;
    axios.post('http://localhost:3000/tasks',{name:task})
      .then(response=>setTasks([...tasks,response.data]))
      .catch(error => console.error('Error adding task:', error));
    setTask('');
  };
  const deleteTask=(id)=>{
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };
  const viewTask = (task) => {
    alert(`Task: ${task.name}`);
  };
   return (
    <div>
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={task} 
        onChange={e => setTask(e.target.value)} 
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} 
            <div className="task-buttons">
              <button className="view-button" onClick={() => viewTask(task)}>View</button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;