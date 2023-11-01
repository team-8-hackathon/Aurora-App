import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './NotFoundPage.css'


const NotFoundPage = () => {
    const history = useHistory();

    //redirect to splash page
    const backToHome = () => {
        history.push('/')
    }
    return (
        <div className="not-found-page-container">
            <div className="message-container">
                <h1>Sorry, we couldn't find that page</h1>
                <img className='not-found-icon' src='/images/mood-sad.svg' alt='sad face' />
            </div>
            <button onClick={backToHome} className="blog-post-button submit">Back to Home</button>
        </div>
    )
}

export default NotFoundPage;