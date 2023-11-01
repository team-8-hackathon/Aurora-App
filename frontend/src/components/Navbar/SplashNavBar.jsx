import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllTopics } from '../../store/topics';
import './SplashNavBar.css';

function SplashNavBar() {
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
    if(!allTopics) return null;

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="menu-items">
                    <div
                        className="navbar-item"
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                    >
                        Article Topics
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                {allTopics.length ? allTopics.map(topic => (
                                    <a key={topic.id} href={`/topics/${topic.id}`} className="dropdown-item">
                                        {topic.topic}
                                    </a>
                                )) : <p className='dropdown-item no-topics'>No Topics Yet</p>}
                            </div>
                        )}
                    </div>
                    <div className="navbar-item">
                        <a href="mailto:hi@aurorahelps.app?subject=Contacting Aurora&body=Hello Aurora," style={{ color: '#00283D', textDecoration: 'none' }}>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SplashNavBar;



