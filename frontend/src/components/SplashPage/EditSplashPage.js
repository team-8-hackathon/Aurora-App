import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkEditParagraph, thunkGetAllParagraphs } from "../../store/splashpage";

const EditSplashPage = ({ paragraph }) => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(thunkGetAllParagraphs())
    }, [dispatch])

    return (
        <h1>Hi</h1>
    )
}

export default EditSplashPage;
