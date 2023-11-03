import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdatePassword } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";


const EditAdmin = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    useEffect(() => {
        const validationErrors = {}
        if(password !== confirmPassword) validationErrors.password = "Passwords must match"
        setErrors(validationErrors)
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        const response = await dispatch(thunkUpdatePassword(password))
        if(response.errors) {
            setErrors({'serverErrors': response.errors[0]})
        } else  {
            closeModal()
        }

    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="update-admin-form-container">
                <h1 className="login-title">Update Password</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                {hasSubmitted && errors.password && <p className="errors">{errors.password}</p>}
                <input className="login-input" type='password' placeholder="password"
                value={password} onChange={e => setPassword(e.target.value)}/>
                <input className="login-input" type='password' placeholder="confirm password"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                {hasSubmitted && errors.serverErrors && <p className="errors">{errors.serverErrors}</p>}
                <div className="button-container">
                <button className='blog-post-button cancel' type='button' onClick={handleCancel}>Cancel</button>
                <button className="blog-post-button submit" type='submit'>Update Password</button>
                </div>
            </form>

        </div>
    )
}

export default EditAdmin;