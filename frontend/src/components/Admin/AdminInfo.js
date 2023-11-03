import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import OpenModalButton from "../UtilityComponents/OpenModalButton";
import EditAdmin from '../auth/EditAdmin'

const AdminInfo = () => {
    const admin = useSelector(state => state.session.user)
    return (
        <div className="login-form-container">
            <h1>Admin Info</h1>
            <p>Last updated password: {admin.updated_at}</p>
            <OpenModalButton modalComponent={<EditAdmin />} buttonText='Update Password'/>
        </div>
    )
}

export default AdminInfo;