import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const submitData = async () => {
        const data = { email: userEmail, password: userPassword }

        await axios.post('https:reqres.in/api/register', data)
            .then(resp => { return resp.data })
            .then((result) => {
                localStorage.setItem('id', result.id)
                localStorage.setItem('token', result.token)
                navigate('/dashboard')
            })

            .catch((err) => console.log(err))
    }
    const loginUser = async (e) => {
        e.preventDefault()
        submitData();

        setUserEmail('');
        setUserPassword('');
    }



    return (
        <>
            <div className="task-app">
                <h1>Task Manager</h1>
            </div>
            <div className="topbar">
                <h2>Welcome Guest</h2>
                <p>Please login to add task</p>
            </div>

            <div className='login-div'>
                <div className="form-div">
                    <h1>Login</h1>
                    <form className='login-form' action="">
                        <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { setUserEmail(e.target.value) }} />
                        <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => { setUserPassword(e.target.value) }} />
                        <button type="submit" onClick={loginUser}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;