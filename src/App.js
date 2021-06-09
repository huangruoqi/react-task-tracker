import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import React, { useState, useEffect } from 'react'
const JSON_API = 'https://react-task-tutorial.herokuapp.com/api';

// 55:45
function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])
  
  const fetchTasks = async () => {
      const res = await fetch(`${JSON_API}/tasks`)
      const data = await res.json();
      return data;
    }
  
  const toggleAdd = () => {
    setShowAdd(!showAdd)
  }

  const addTask = async (task) => {
    const res = await fetch(`${JSON_API}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data]);
  }


  const deleteTask = async (id) => {
    await fetch(`${JSON_API}/tasks/${id}`, {
      method:'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder =  (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: 
    !task.reminder} : task))
  }
  return (
    <div className='container'>
      <Header title='Task Tracker' toggleAdd={toggleAdd} showAdd={showAdd} />
      {showAdd && <AddTask onAdd={addTask}/>}
      {tasks.length === 0 ? 
      <h3>No task</h3> : 
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> }
    </div>
  );
}



export default App;
