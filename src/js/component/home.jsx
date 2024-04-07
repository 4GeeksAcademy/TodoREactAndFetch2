import React, { useEffect, useState } from 'react';
import styles from './Components.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [list, setList] = useState([]); // Esta lista es de usuarios
  const [taskList, setTaskList] = useState([]);
  const [input, setInput] = useState('');
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

      setUsername(input);
      setInput(''); // Limpia el input después de crear el usuario
      showList();
      setCounter(counter + 1);
    } catch (error) {
      console.error(error.message);
    }
  };


  const valueInput = async (e) => {

    try {
      setInput(e.target.value);
      console.log(input);

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
    // si data.task= ('') === algún estado haga que se muestre el cartel que no hay tareas para el usuario data.todos
  };
  // get de la info list


  useEffect(async () => {
    try {
      await handlerGetUserList()
    } catch (e) { }
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


  const showList = async () => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${username}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      let listTodos = await response.json();
      console.log("List actualizado:", listTodos); // Registro de depuración
      setList(listTodos.users); // Actualizar list con los datos devueltos por showList()
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
      // actions.deleteUser()
      removeItem(index);
      showList();

    } catch (error) {
      console.error("Error", statusText);
    }
  };

  const deleteTask = async (id) => {
    try {
      let response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error", statusText);
      }

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
    setCounter(counter - 1);
  }


  return (
    <div className='father border'>
      <h1 className='tittle'>Current users</h1>
      <div>
        {
          list && list.map((item, index) => {
            return (
              <div>
                <div className="d-flex justify-content-between bg-secondary">
                  {item.name}
                  <button className='deleteButton bg-white border-0' onClick={() => deleteUser(item.name, index)}>{hidden ? null : "X"}</button>
                </div>
                
              </div>
            )
          })

        }
      </div>
      <div id="counter" className="bg-white text-secondary">{counter != '' ? counter + (' user added') : ''}</div>
      <h1 className='tittle'>Add your new user</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control border-bottom rounded-0 border border-light" placeholder="Search user" aria-label="Add user" value={input} onChange={valueInput} />
        <button className="submitButton" id="basic-addon2" onClick={createUsername}>Or create</button>
      </div>
      <div>
        {taskList && taskList.map((item, index) => (
          <div key={index} onMouseEnter={() => { setHidden(false) }} onMouseLeave={() => { setHidden(true) }} className='border border-light bg-white'>
            <div className='d-flex justify-content-between m-2'>
              {item.label}
              <div>
                <button className='deleteButton bg-white border-0' onClick={() => deleteTask(item.name, index)}>{hidden ? null : "X"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;

//explorar la documentación en general (todo,users,etc)

// const handlerinfoUser = async () => {
//   let editItem = {
//     label: username,
//     done: false
//   };

//   try {
//     let response = await fetch(
//       `https://playground.4geeks.com/todo/users/${username}`,
//       {
//         method: "PUT",
//         body: JSON.stringify(newItem),
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Network error");
//     }

//     let data = await response.json();
//     console.log(data);
//     console.log("List antes de la actualización:", list); // Registro de depuración
//     setList([...list, editItem.lenght]); // Aquí estás intentando agregar un nuevo elemento a list
//     setInput(''); // Asegúrate de limpiar el input después de agregar un nuevo elemento
//   } catch (e) {
//     console.error("Error: ", e);
//   }

// };