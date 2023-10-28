import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllTopics, thunkDeleteTopic } from '../../store/topics';
import { logout } from '../../store/session';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './AdminNavBar.css';

function AdminNavbar() {
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const dispatch = useDispatch();
    const allTopics = useSelector((state) => state.topic.topics);

    useEffect(() => {
        dispatch(thunkGetAllTopics());
    }, [dispatch]);

    const showAdminDropdown = () => {
        setAdminDropdownOpen(true);
    };

    const hideAdminDropdown = () => {
        setAdminDropdownOpen(false);
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleLogout = () => {
        dispatch(logout()); 
    };

    const handleDeleteTopic = async (topicId) => {

        const confirmation = window.confirm("Are you sure you want to delete this topic?");
        if (!confirmation) return;

        const response = await dispatch(thunkDeleteTopic(topicId));

        if (response.success) {
            dispatch(thunkGetAllTopics());
        } else {
            console.error("Failed to delete the topic.");
        }
    };

    return (
        <div className="admin-navbar-container">
            <div className="admin-navbar-content">
                <div className="admin-navbar-brand">
                    <Link to="/admin" className="admin-dashboard-link">Admin Dashboard</Link>
                </div>
                <div className="admin-navbar-menu-items">
                    <form className='nav-form'
                        onSubmit={(e) => {
                            e.preventDefault();
                            window.location.href = `/#/?search=${searchInput}`;
                        }}
                    >
                        <input
                            className="navbar-search"
                            type="search"
                            placeholder="Search Blogs"
                            value={searchInput}
                            onChange={handleSearchInput}
                        />
                    </form>
                    <Link to="/admin/post-topic" className="admin-navbar-item">Create Topic</Link>
                    <div
                        className="admin-navbar-item"
                        onMouseEnter={showAdminDropdown}
                        onMouseLeave={hideAdminDropdown}
                    >
                        Article Topics
                        {adminDropdownOpen && (
                            <div className="admin-navbar-dropdown-menu">
                                {allTopics.map(topic => (
                                    <div key={topic.id} className="admin-navbar-dropdown-item-container">
                                        <a href={`/topics/${topic.id}`} className="admin-navbar-dropdown-item">
                                            {topic.topic}
                                        </a>
                                        <i
                                            className="fa fa-trash"
                                            onClick={() => handleDeleteTopic(topic.id)}
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/admin" onClick={handleLogout}>Log Out</Link>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;



