import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllTopics } from '../../store/topics';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const dispatch = useDispatch()
    const allTopics = useSelector((state) => state.topic.topics)
    useEffect(() => {
        dispatch(thunkGetAllTopics())
    }, [dispatch])

    const showDropdown = () => {
        setDropdownOpen(true);
    };

    const hideDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="nav-container">
            <div className="nav-content">
                <div className="nav-brand">
                    <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/images/icon+wordmark.png`} alt="Company Logo" className="nav-logo" />
                    </Link>
                </div>
                <div className="nav-menu-items">
                    <div
                        className="nav-item"
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                    >
                        Article Topics
                        {dropdownOpen && (
                            <div className="nav-dropdown-menu">
                                {allTopics.map(topic => (
                                    <a key={topic.id} href={"/"} className="nav-dropdown-item">
                                        {topic.topic}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="nav-item">
                        <a href="mailto:hi@aurorahelps.app?subject=Contacting Aurora&body=Hello Aurora," style={{ color: '#00283D', textDecoration: 'none' }}>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;