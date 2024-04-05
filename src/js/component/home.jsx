/* import React, { useState } from 'react';
import styles from './Components.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [list, setList] = useState([]); // Inicializar list como un arreglo vacío
  const [input, setInput] = useState('');
  const [hidden, setHidden] = useState(true);
  const [counter, setCounter]= useState(0);

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


  const valueUsername = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  // get de la info list
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
  const deleteUser = async (usernameToDelete) => {
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
      actions.showList();
      showList();

    } catch (error) {
      console.error("Error", statusText);
    }
  };

  const removeItem = (index) => {
		let newList = [...list];
		newList.splice(index, 1);
		setList(newList);
		setCounter(counter - 1);
	}


  return (
    <div className='father border'>
      <h1 className='tittle'>Add your new user</h1>
      <div class="input-group mb-3">
        <input type="text" class="form-control border-bottom rounded-0 border border-light" placeholder="Add user" aria-label="Add user"  value={input} onChange={valueUsername} />
        <button class="submitButton" id="basic-addon2" onClick={createUsername}>Submit</button>
      </div>
      <div>
        {console.log(list)}
        {list.map((item, index) => (
          <div key={index} onMouseEnter={() => { setHidden(false) }} onMouseLeave={() => { setHidden(true) }}className='border border-light bg-white'>
            <div className='d-flex justify-content-between m-2'>
              {item.name}
              <div>
                <button className='deleteButton bg-white border-0' onClick={() => deleteUser(item.name)}>X</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="counter" className="bg-white text-secondary">{counter != ''? counter + (' user added'): ''}</div>
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

// }; */

import React, { useState } from 'react';
import styles from './Components.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const [hidden, setHidden] = useState(true);
  const [counter, setCounter] = useState(0);

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
      setInput('');
      showList();
      setCounter(counter + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const valueUsername = (e) => {
    setInput(e.target.value);
    console.log(input);
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
      console.log("List actualizado:", listTodos);
      setList(listTodos.users);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

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
      showList();
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const removeItem = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setCounter(counter - 1);
  }

  return (
    <div className='father border'>
      <h1 className='tittle'>Add your new user</h1>
      <div class="input-group mb-3">
        <input type="text" class="form-control border-bottom rounded-0 border border-light" placeholder="Add user" aria-label="Add user" value={input} onChange={valueUsername} />
        <button class="submitButton" id="basic-addon2" onClick={createUsername}>Submit</button>
      </div>
      <div>
        {list.map((item, index) => (
          <div key={index} onMouseEnter={() => { setHidden(false) }} onMouseLeave={() => { setHidden(true) }} className='border border-light bg-white'>
            <div className='d-flex justify-content-between m-2'>
              {item.name}
              <div>
                {/* Combinando deleteUser y removeItem */}
                <button className='deleteButton bg-white border-0' onClick={() => deleteUser(item.name, index)}>{hidden ? null : "X"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="counter" className="bg-white text-secondary">{counter != ''? counter + (' users added'): ''}</div>
    </div>
  );
};

export default Home;
