import React from "react";
import OpenModalButton from "../UtilityComponents/OpenModalButton";
import { BiEdit } from 'react-icons/bi'
import EditSplashPage from "./EditSplashPage";

const RenderEditButton = ({ paragraph }) => {

    return (
        <OpenModalButton
        buttonText={<BiEdit />}
        modalComponent={<EditSplashPage section={paragraph} />}
        className="edit-pencil-symbol"
        />
    )
}

export default RenderEditButton;
