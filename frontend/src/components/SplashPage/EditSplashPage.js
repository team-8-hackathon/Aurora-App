import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditParagraph, thunkGetAllParagraphs } from "../../store/splashpage";
import { useModal } from "../../context/Modal";
import './EditSplashPage.css';

const EditSplashPage = ({ section }) => {
    const dispatch = useDispatch();
    const [header, setHeader] = useState(section.header);
    const [paragraph, setParagraph] = useState(section.paragraph);
    const [title, setTitle] = useState(section.title);
    const { closeModal } = useModal();

    // console.log('PARAGRAPHARR:', section)

    useEffect(() => {
        dispatch(thunkGetAllParagraphs())
    }, [dispatch])

    const handlesubmit = async e => {
        e.preventDefault();
        
        console.log('title:', title);
        console.log('header:', header);
        console.log('paragraph:', paragraph);

        const newSection = new FormData();
        // console.log('newSection', title, header, paragraph)
        // console.log('SECTIONID', section.id)
        newSection.append('title', title)
        newSection.append('header', header)
        newSection.append('paragraph', paragraph)

        await dispatch(thunkEditParagraph(section.id, newSection))
        closeModal()
        // dispatch(thunkGetAllParagraphs())
    }

    return (
        <div className="edit-splash-page-modal-container">
            <h3 className="edit-splash-page-header">Edit Splash Page</h3>
            <form method='PUT' encType="multipart/form-data" onSubmit={handlesubmit}>
                <textarea
                    type='text'
                    rows='1'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter new title here"
                    name='title'
                />
                <textarea
                    type='text'
                    rows='3'
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    placeholder="Enter new header here"
                    name='header'
                />
                <textarea
                    type='text'
                    rows='8'
                    value={paragraph}
                    onChange={(e) => setParagraph(e.target.value)}
                    placeholder="Enter new paragraph here"
                    name='paragraph'
                />
                <button className="edit-splash-submit-button" type='submit'>Edit</button>
            </form>
        </div>
    )
}

export default EditSplashPage;
