import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
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
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: taskToToggle.reminder };
    const res = await fetch(`${JSON_API}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json();
    setTasks(tasks.map(task => task.id === id ? {
      ...task, reminder:
        !data.reminder
    } : task))
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${JSON_API}/tasks/${id}`)
    const data = await res.json();
    return data;
  }

  return (
    <Router>
      <div className='container'>
        <Header title='Task Tracker' toggleAdd={toggleAdd} showAdd={showAdd} />
        <Route path='/' exact render={(props) => (
          <div>
            {showAdd && <AddTask onAdd={addTask} />}
            {tasks.length === 0 ?
              (<h3>No task</h3>) :
              (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)}
          </div>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}



export default App;
