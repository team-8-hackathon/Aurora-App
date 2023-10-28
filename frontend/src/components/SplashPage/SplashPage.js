import React from 'react';
import { Link } from 'react-router-dom';
import TopSignup from '../signups/top_signup';
import './SplashPage.css';

const SplashPage = () => {

    return (
        <div className='splash-page-container'>
            <div className="splash-page-top-section">
                <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/images/icon+wordmark.png`} alt="Company Logo" className="splash-page-nav-logo" />
                </Link>
                <h1>Feel better with Aurora</h1>
                <p>Aurora is an AI emotional wellness companion offering a unique blend of personalized support through conversation, mood tracking, and mindset tools, all in a safe space for self-exploration and growth</p>
                <img className="splash-page-hero-graphic" src='/images/hero-graphic.png' alt="Hero Graphic" />
            </div>
            <div className='splash-page-top-signup'>
                <TopSignup />
            </div>
            <div className='splash-page-benefits'>
                <div className='benefits-self-awareness'>
                    <img src='/images/benefit-1.png' alt='self-awareness' />
                    <p>Build deeper self-awareness</p>
                    <p>With mood tracking</p>
                </div>
                <div className='benefits-self-esteem'>
                    <img src='/images/benefit-2.png' alt='self-esteem' />
                    <p>Improve your self-esteem</p>
                    <p>With daily affirmations</p>
                </div>
                <div className='benefits-self-esteem'>
                    <img src='/images/benefit-3.png' alt='positive-mindset' />
                    <p>Cultivate a positive mindset</p>
                    <p>With mindset tools</p>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
