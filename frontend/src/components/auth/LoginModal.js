import React from "react";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './LoginModal.css'


const LoginModal = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(username, password));
        if (data) {
            console.log(data)
            setErrors(data);
        } else {
            history.push('/admin')
        }
    };

    const handleCancel = () => {
        history.push('/') //If cancel login, redirect to  home page
    }

    return (
        <div className="login-form-container">
            <h1 className="login-title">Admin Login</h1>
            <form className="login-form">
                <input className="login-input" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input className="login-input" type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <div className="button-container">
                    <button className='blog-post-button cancel' type='button' onClick={handleCancel}>Cancel</button>
                    <button className="blog-post-button submit" type='submit' onClick={handleSubmit}>Login</button>
                </div>
            </form>
            {errors && <p className="errors">{errors}</p>}
        </div>
    );
}

export default LoginModal;