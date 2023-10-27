import React from "react";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
            setErrors(data);
        } else {
            closeModal()
        }
    };

    const handleCancel = () => {
        history.push('/') //If cancel login, redirect to home page
    }

    return (
        <div>
            <h1>Admin Login</h1>
            <form>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit' onClick={handleSubmit}>Login</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
            {errors && <p className="errors">{errors}</p>}
        </div>
    );
}

export default LoginModal;