import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllTopics, thunkDeleteTopic } from '../../store/topics';
import { logout } from '../../store/session';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './AdminNavBar.css';
import { thunkGetBlogs } from '../../store/blog';
import { useSearch } from '../../context/SearchContext';
import OpenModalButton from '../UtilityComponents/OpenModalButton';
import ConfirmModal from '../UtilityComponents/ConfirmModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AdminNavbar() {
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const history = useHistory();
    const { searchBlogs } = useSearch();

    const dispatch = useDispatch();
    const allTopics = useSelector((state) => state.topic.topics);
    const allBlogs = useSelector(state => state.blog.blogs)

    useEffect(() => {
        dispatch(thunkGetAllTopics());
        dispatch(thunkGetBlogs())
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleDeleteTopic = async (topicId) => {
        dispatch(thunkDeleteTopic(topicId))
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            history.push('/admin')
        }
    }

    if (!allBlogs || !allTopics) return null;

    return (
        <div className="admin-navbar-container">
            <div className="inner-admin-navbar-container">
                <div className="admin-navbar-content">
                    <Link to="/admin" className="admin-dashboard-link">Admin Dashboard</Link>
                    <input className="search-bar" title="Search by title, topic, or body" type='search' onChange={(e) => searchBlogs(allBlogs, e.target.value)} onKeyDown={handleSearch} placeholder='Search blogs...' />
                    <div className='menu-right'>
                        <Link to="/admin/subs" className="admin-navbar-item">Subscribers</Link>
                        <Link to="/admin/post-blog" className="admin-navbar-item">Create Blog</Link>
                        <Link to="/admin/post-topic" className="admin-navbar-item">Create Topic</Link>
                        <div
                            className="admin-navbar-item"
                            onMouseEnter={e => setAdminDropdownOpen(true)}
                            onMouseLeave={e => setAdminDropdownOpen(false)}
                        >
                            Article Topics
                            {adminDropdownOpen && (
                                <div className="admin-navbar-dropdown-menu">
                                    {allTopics.map(topic => (
                                        <div key={topic.id} className="admin-navbar-dropdown-item-container">
                                            <a href={`/admin/topics/${topic.id}`} className="admin-navbar-dropdown-item">
                                                {topic.topic}
                                            </a>
                                            <OpenModalButton
                                                className='topic-delete-button'
                                                buttonText={<i className='fa fa-trash' />}
                                                modalComponent={<ConfirmModal
                                                    modalTitle={"Are you sure you want to delete this topic?"}
                                                    yesHandler={handleDeleteTopic}
                                                    optionalCBArg={topic.id}
                                                />}
                                            />

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link className="logout-link" to="/admin" onClick={handleLogout}>Log Out</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;



