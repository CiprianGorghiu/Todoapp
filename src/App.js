import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineCheck} from 'react-icons/ai';

function App() {
  const[isCompletedScreen, setIsCompletedScreen] = React.useState(false);
  const[allTasks, setAllTasks] = React.useState([]);
  const[taskTitle, setTaskTitle] = React.useState('');
  const[taskDescription, setTaskDescription] = React.useState('');
  const[completedTasks, setCompletedTasks] = React.useState([]);

  const handleAddToDo = () => {
    let newTaskItem = {
      title: taskTitle,
      description: taskDescription,
    }
    let UpdatedTasks = [...allTasks];
    UpdatedTasks.push(newTaskItem);
    setAllTasks(UpdatedTasks);
    localStorage.setItem('Todolist', JSON.stringify(UpdatedTasks));
  }

 const handleCompletTask = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedDate = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s; 

    let filteredItem = {
      ...allTasks[index],
      completedOn: completedDate
    }
    let updateCompletedDate = [...completedTasks];
    updateCompletedDate.push(filteredItem);
    setCompletedTasks(updateCompletedDate);
    handleDeleteTask(index);
    localStorage.setItem('completedTask', JSON.stringify(updateCompletedDate));
  }  

  useEffect(() => {

    let tasks = localStorage.getItem('Todolist');
    let completedTask = localStorage.getItem('completedTask');
    if(tasks){
      setAllTasks(JSON.parse(tasks));
    }

    if(completedTask){
      setCompletedTasks(JSON.parse(completedTask));

   }
  }
  ,[])

  const handleDeleteTask = (index) => {
    let UpdatedTasks = [...allTasks];
    UpdatedTasks.splice(index, 1);
    setAllTasks(UpdatedTasks);
    localStorage.setItem('Todolist', JSON.stringify(UpdatedTasks));
  }

  const handleDeleteCompletedTask = (index) => {
    let UpdatedTasks = [...completedTasks];
    UpdatedTasks.splice(index, 1);
    setCompletedTasks(UpdatedTasks);
  }


  return (
    <div className="App">
    
      <div className="container">
      <h1>Todo App</h1>
        <div className="input-item">

          <input type="text" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} placeholder="What's the task title?" /> 
          </div>
          <div className="input-item">
      
          <input type="text" value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)} placeholder="What's the task description?" /> 
          </div>
          <div className="input-item">
        
         <button type="button" onClick={handleAddToDo} className="primaryBtn">Adaugare</button>
          </div>
        <hr />
          <div className="btn-area">
        <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`} onClick={()=>setIsCompletedScreen(false)}> To Do</button>
        <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`} onClick={()=>setIsCompletedScreen(true)}>Completed List</button>
        <div className="task-list">
            {isCompletedScreen===false && allTasks.map((item, index) => {
              return(
                <div className="task-item" key={index}>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineCheck className="icon" onClick={() => handleCompletTask(index)}/>
                  <AiOutlineDelete className="delete-icon" onClick={() => handleDeleteTask(index) } />
                </div>
              </div>
              )
            },)}


          {isCompletedScreen===true && completedTasks.map((item, index) => {
              return(
                <div className="task-item" key={index}>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small><i> Is completed: {item.completedOn}</i></small></p>
                </div>
                <div>
                  <AiOutlineDelete className="delete-icon" onClick={() => handleDeleteCompletedTask(index) } />
                </div>
              </div>
              )
            },)}


          </div>
        </div>
      </div>
    
       
    </div>
  );
}

export default App;
