import React from "react";
import OpenModalButton from "../UtilityComponents/OpenModalButton";
import { BiEdit } from 'react-icons/bi'
import EditSplashPage from "./EditSplashPage";
import './EditSplashPage.css'

const RenderEditButton = ({ paragraph }) => {

    return (
        <OpenModalButton
        buttonText='EDIT THIS SECTION'
        modalComponent={<EditSplashPage section={paragraph} />}
        className="edit-pencil-symbol"
        />
    )
}

export default RenderEditButton;
