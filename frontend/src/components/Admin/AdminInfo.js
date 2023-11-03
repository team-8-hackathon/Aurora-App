import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import OpenModalButton from "../UtilityComponents/OpenModalButton";
import EditAdmin from './EditAdmin'

const AdminInfo = () => {
    const admin = useSelector(state => state.session.user)
    return (
        <div className="login-form-container">
            <h2>Admin Info</h2>
            <p>Username: {admin.username}</p>
            <p>Password last changed: {admin.updated_at}</p>
            <OpenModalButton 
            modalComponent={<EditAdmin />} className="blog-post-button submit" buttonText='Update Password'/>
        </div>
    )
}

export default AdminInfo;