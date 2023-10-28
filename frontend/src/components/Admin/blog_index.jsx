import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkGetBlogs } from '../../store/blog';
import BlogThumbnail from '../BlogComponents/BlogThumbnail';
import '../BlogComponents/BrowseBlogs.css'
import './BlogIndex.css'
import { useSearch } from '../../context/SearchContext';

const BrowseBlogs = () => {
    const { searchData, resultsFound, searching } = useSearch()
    const blogs = useSelector(state => state.blog.blogs);
    const [numArticles, setNumArticles] = useState(6)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetBlogs())
    }, [dispatch]);

    if (!blogs) return null;


    const showMoreArticles = () => {
        if (numArticles < blogs.length) {
            setNumArticles(numArticles + 6)
        }
    }
    console.log(searchData.length, typeof (searchData))

    return (
        <div >
            {!searchData.length && <div className='browse-blogs-container'>
                {resultsFound && <h4 className='topic-title'>All Blogs</h4>}{!resultsFound && <h4 className='topic-title'>No search results found</h4>}
                 <div className='blog-container'>{blogs.slice(0, numArticles).map((blog = {}) => (
                    <div key={blog.id}>
                        <BlogThumbnail topic={blog.topic} blog={blog} type="admin" />

                    </div>))}
                </div>
            </div>
            }
            {searchData.length && resultsFound && <div className='browse-blogs-container'>
                {searching && <h4 className='topic-title'>Search Results</h4>}
                {!searching && <h4 className='topic-title'>All Blogs</h4>}
                 <div className='blog-container'>{searchData.slice(0, numArticles).map((blog = {}) => (
                    <div key={blog.id}>
                        <BlogThumbnail topic={blog.topic} blog={blog} type="admin" />

                    </div>))}
                </div>
            </div>
            }
            { numArticles < blogs.length && <button className='show-more-articles-button' onClick={showMoreArticles}>Show more articles</button> }
        </div >
    )
}

export default BrowseBlogs;
