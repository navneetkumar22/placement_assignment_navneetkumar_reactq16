import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import axios from "axios";

const Dashboard = () => {
    const [userData, setUserData] = useState('');
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate('');

    const userId = localStorage.getItem('id');
    const userToken = localStorage.getItem('token');

    useEffect(() => {
        fetchUser();
    },);

    // fetch the current user
    const fetchUser = async () => {
        await axios.get(`https://reqres.in/api/users/${userId}`)
            .then(resp => { return resp.data.data })
            .then((result) => { setUserData(result) })
            .catch(error => console.log(error))
    };

    //logout the current user
    const logOut = () => {
        const getConfirm = window.confirm("Are you sure to logout?")
        if (getConfirm === true) {
            localStorage.clear();
            navigate('/')
        }
    }

    //create new task
    const createTask = () => {
        const newTask = {
            title: prompt("Enter new task"),
            id: uuidv4()
        };
        setTasks([...tasks, newTask]);
    }

    //edit the task
    const editTask = (id) => {
        const updatedTasks = tasks.map((item) => {
            if (item.id === id) {
                return { ...item, title: prompt("Enter new task") }
            }
            return item;
        })
        setTasks(updatedTasks);
    }

    //delete the task
    const deleteTask = (id) => {
        const filteredTasks = tasks.filter((item) => item.id !== id);
        setTasks(filteredTasks);
    }

    if (!userToken) {
        return (
            <>
                <div className="task-app">
                    <h1>Task Manager</h1>
                </div>
                <div className="topbar">
                    <h2>Welcome Guest</h2>
                    <p>Please login to add task</p>
                </div>
                <div className="sorry">
                    <h3>Sorry, please <Link to='/'>login</Link> first to add tasks</h3>
                </div>

            </>
        )
    }


    return (
        <>
            <div className="task-app">
                <h1>Task Manager</h1>
            </div>
            <div className="topbar">
                <div className="user">
                    <img src={userData.avatar} alt="user" />
                    <h2>{userData.first_name + " " + userData.last_name}</h2>
                </div>
                <div className="nav-buttons">
                    <button className="create" onClick={() => createTask()}>Create new Task</button>
                    <button className="logout" onClick={() => logOut()}>Logout</button>
                </div>
            </div>


            {/* task section */}

            <section className="tasks">
                <h2>All Tasks</h2>

                {tasks && tasks.map((task) => (

                    <div className="task-div" key={uuidv4()}>
                        <h3>{task.title}</h3>
                        <div className="action">
                            <img src={editIcon} alt="" onClick={() => editTask(task.id)} />
                            <img src={deleteIcon} alt="" onClick={() => deleteTask(task.id)} />
                        </div>
                    </div>

                ))}

            </section >
        </>
    )
}

export default Dashboard;