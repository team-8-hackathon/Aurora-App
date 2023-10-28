import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

const EditBlogForm = () => {
    const { blogId } = useParams();
    return (
        <>
            <h1>edit blog {blogId} form</h1>
        </>
    )
}

export default EditBlogForm;