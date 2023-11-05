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

        // console.log('title:', title);
        // console.log('header:', header);
        // console.log('paragraph:', paragraph);

        const newSection = new FormData();

        newSection.append('title', title)
        newSection.append('header', header)
        newSection.append('paragraph', paragraph)

        await dispatch(thunkEditParagraph(section.id, newSection))
        closeModal()
        dispatch(thunkGetAllParagraphs())
    }

    return (
        <div className="edit-splash-container">
            <div className="edit-splash-header-container">
                <p className="edit-splash-header">Edit Splash Page</p>
            </div>
            <form className='edit-splash-form-container' method='PUT' encType="multipart/form-data" onSubmit={handlesubmit}>
                <div className="edit-splash-section-container">
                    <label className="edit-splash-section-label">
                        Title
                    </label>
                    <textarea
                        className="edit-splash-body"
                        type='text'
                        rows='1'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter new title here"
                        name='title'
                    />
                </div>
                <div className="edit-splash-section-container">
                    <label className="edit-splash-section-label">
                        Header
                    </label>
                    <textarea
                        className="edit-splash-body"
                        type='text'
                        rows='3'
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                        placeholder="Enter new header here"
                        name='header'
                    />
                </div>
                <div className="edit-splash-section-container">
                    <label className="edit-splash-section-label">
                        Paragraph
                    </label>
                    <textarea
                        className="edit-splash-body"
                        type='text'
                        rows='8'
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                        placeholder="Enter new paragraph here"
                        name='paragraph'
                    />
                </div>
                <div className="edit-splash-submit-container">
                    <button className="edit-splash-submit-button" type='submit'>Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditSplashPage;
