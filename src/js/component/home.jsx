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

      await showUserList();
      setUsername(input);
      setInput(''); // Limpia el input después de crear el usuario
      setCounter(prevCounter => prevCounter + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createNewTask = async () =>{
    try{
      let response = await fetch(`https://playground.4geeks.com/todo/todos/${input}`,{
        method: "POST",
        body: JSON.stringify({
          label: task,
          done: false
        }),
        headers: {"Content-Type": "application/json"}
      });
      if(!response.ok){
        throw new Error(response.statusText);
      }
      
      // setTaskList([...taskList, task]);
      reloadTodoList()
      setTask('');
      setCounter(prevCounter => prevCounter + 1);
      // await showUserTaskList();
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
  const reloadTodoList = async()=>{
    try{
      console.log("ENTRÉ EN RELOADTODOLIST")
      let response = await fetch(`https://playground.4geeks.com/todo/users/${input}`);
      if(!response.ok){
        throw new Error(response.status);
      }
      let data = await response.json()
      setTaskList(data.todos)
    }catch(e){
      console.error(e)
    }
  }

  const handlerUserClick = async(name)=>{
    try{
      setInput(name)
      console.log("EL VALOR DEL INPUT AHORA ES:",input)
      setTimeout(async()=>{await reloadTodoList()},500)
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() => {
    handlerGetUserList();
  }, [counter])

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
  const showUserList = async () => {
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
      await showUserList();

    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      let response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error", response.statusText);
      }
      await reloadTodoList();
      
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

  
  return (
    <div className='father border'>
      <h1 className='tittle'>Current users</h1>
      <div>
        {
          list && list.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex justify-content-between bg-white border border-light">
                  <div onClick={()=>handlerUserClick(item.name)}>{item.name}</div>
                  <button className='deleteButton bg-white border-0' onClick={() => deleteUser(item.name, index)}>X</button>
                </div>               
              </div>
            )
          })

        }
      </div>
      <div id="counter" className="bg-white text-secondary">{counter !== 0 ? counter + ' user added' : ''}</div>
      <h1 className='tittle'>Add your new user</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control border-bottom rounded-0 border border-light" placeholder="Select your user above or create a new one" aria-label="Select your user above or create a new one" value={input} onChange={valueInput} />
        <button className="submitButton" id="basic-addon2" onClick={createUsername}>Or create</button>
        
        <input type="text" className="form-control border-bottom rounded-0 border border-light" placeholder='Add a new task' area label="Add a new task" value={task} onChange={(e)=> setTask(e.target.value)}></input>
        <button className="submitButton" id="basic-addon2" onClick={createNewTask}>Add task</button>
      </div>
      <div>
        {taskList && taskList.map((item, index) => (
          <div key={index} className='border border-light bg-white'>
            <div className='d-flex justify-content-between m-2'>
              {item.label}
              <div>
                <button className='deleteButton bg-white border-0' onClick={() => deleteTask(item.id)}>X</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;