import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllTopics } from '../../store/topics';
import { logout } from '../../store/session';
import { Link } from 'react-router-dom';
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

    return (
        <div className="admin-navbar-container">
            <div className="admin-navbar-content">
                <div className="admin-navbar-brand">
                    <Link to="/" className="admin-dashboard-link">Admin Dashboard</Link>
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
                    <Link to="/admin" className="admin-navbar-item">Create Topic</Link>
                    <div
                        className="admin-navbar-item"
                        onMouseEnter={showAdminDropdown}
                        onMouseLeave={hideAdminDropdown}
                    >
                        Article Topics
                        {adminDropdownOpen && (
                            <div className="admin-navbar-dropdown-menu">
                                {allTopics.map(topic => (
                                    <a key={topic.id} href={`/topics/${topic.id}`} className="admin-navbar-dropdown-item">
                                        {topic.topic}
                                    </a>
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



