import React, { useEffect, useState } from 'react';
import styles from './Components.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [input, setInput] = useState('');
  const [list, setList] = useState([]); // Esta lista es de usuarios

  const [userTasks, setUserTasks] = useState('');
  const [task, setTask] = useState('');
  const [userTaskList, setUserTaskList] = useState([]); // Asegúrate de definir userTaskList en el estado

  const [taskList, setTaskList] = useState([]); 

  const [hidden, setHidden] = useState(true);
  const [counter, setCounter] = useState(0);

  // Postear el usuario
  const createUsername = async () => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${input}`,
        {
          method: "POST",
          body: JSON.stringify([]),
          headers: { "Content-Type": "application/json" }
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      await showList();
      setUsername(input);
      setInput(''); // Limpia el input después de crear el usuario
      setCounter(prevCounter => prevCounter + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createNewTask = async () =>{
    try{
      let response = await fetch(`https://playground.4geeks.com/todo/todos/${task}`,{
        method: "POST",
        body: JSON.stringify([]),
        headers: {"Content-Type": "application/json"}
      });
      if(!response.ok){
        throw new Error(response.statusText);
      }
      
      setUserTasks(task);
      setTask('');
      setCounter(prevCounter => prevCounter + 1);
      await showUserTaskList();
    }
    catch(e){
      console.error(e)
    }
  }

  const valueInput = async (e) => {

    try {
      setInput(e.target.value);

      let response = await fetch(`https://playground.4geeks.com/todo/users/${e.target.value}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      };
      let data = await response.json()
      setTaskList(data.todos)
    }
    catch (e) {
      console.error(e)
    }
  };

  // get de la info list
  const valueTask = async(e)=>{
    try{
      setTask(e.target.value);

      let response = await fetch(`https://playground.4geeks.com/todo/users/${e.target.value}`);
      if(!response.ok){
        throw new Error(response.status);
      }
      let data = await response.json()
      setTaskList(data.todos)
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() => {
    handlerGetUserList();
  }, [])

  const handlerGetUserList = async () => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      let listUsers = await response.json();
      console.log("listUsers actualizado:", listUsers); // Registro de depuración
      setList(listUsers.users); // Actualizar list con los datos devueltos por showList()
    } catch (e) {
      console.error("Error: ", e);
    }
  };

 // mostrar listas
  const showList = async () => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${username}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      let listUsers = await response.json();
      console.log("List actualizado:", listUsers); // Registro de depuración
      setList(listUsers.users); // Actualizar list con los datos devueltos por showList()
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const showUserTaskList = async () => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${userTasks}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      let listTodos = await response.json();
      console.log("List actualizado:", listTodos); // Registro de depuración
      setList(listTodos.todos); // Actualizar list con los datos devueltos por showList()
    } catch (e) {
      console.error("Error: ", e);
    }
  };


  // borra el usuario al ser llamada
  const deleteUser = async (usernameToDelete, index) => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${usernameToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("the user couldn't be deleted" + response.statusText)
      }
      removeItem(index);
      await showList();

    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const deleteTask = async (id, index) => {
    try {
      let response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error", response.statusText);
      }
      removeTask(index);
      await showTaskList();
      let data = await response.json()
      alert("el task ha sido borrado correctamente");

    } catch (e) {
      console.error(e)
    }
  }

  const removeItem = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setCounter(prevCounter => prevCounter - 1);
  }

  const removeTask= (index)=>{
    let newTaskList =[...userTaskList];
    newTaskList.splice(index,1);
    setUserTaskList(newTaskList);
    setCounter(prevCounter => prevCounter - 1);
  }
  return (
    <div className='father border'>
      <h1 className='tittle'>Current users</h1>
      <div>
        {
          list && list.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex justify-content-between bg-white border border-light">
                  {item.name}
                  <button className='deleteButton bg-white border-0' onClick={() => deleteUser(item.name, index)}>{hidden ? null : "X"}</button>
                </div>               
              </div>
            )
          })

        }
      </div>
      <div id="counter" className="bg-white text-secondary">{counter !== 0 ? counter + ' user added' : ''}</div>
      <h1 className='tittle'>Add your new user</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control border-bottom rounded-0 border border-light" placeholder="Search user" aria-label="Add user" value={input} onChange={valueInput} />
        <button className="submitButton" id="basic-addon2" onClick={createUsername}>Or create</button>
        
        <input type="text" className="form-control border-bottom rounded-0 border border-light" placeholder='Add a new task' area label="Add a new task" value={task} onChange={(e)=> setTask(e.target.value)}></input>
        <button className="submitButton" id="basic-addon2" onClick={createNewTask}>Add task</button>
      </div>
      <div>
        {taskList && taskList.map((item, index) => (
          <div key={index} onMouseEnter={() => { setHidden(false) }} onMouseLeave={() => { setHidden(true) }} className='border border-light bg-white'>
            <div className='d-flex justify-content-between m-2'>
              {item.label}
              <div>
                <button className='deleteButton bg-white border-0' onClick={() => deleteTask(item.todos, index)}>{hidden ? null : "X"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;