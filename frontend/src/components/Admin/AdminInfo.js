import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import OpenModalButton from "../UtilityComponents/OpenModalButton";
import EditAdmin from './EditAdmin'
import './AdminInfo.css'

const AdminInfo = () => {
    const admin = useSelector(state => state.session.user)
    return (
        <div className="login-form-container">
            <h2 className="admin-info-title">Admin Info</h2>
            <p className="admin-info">Username: {admin.username}</p>
            <p className="admin-info">Password last changed: {admin.updated_at}</p>
            <OpenModalButton 
            modalComponent={<EditAdmin />} className="blog-post-button submit" buttonText='Update Password'/>
        </div>
    )
}

export default AdminInfo;