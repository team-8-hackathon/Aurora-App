import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TopSignup from '../Signups/top_signup';
import BotSignup from '../Signups/bot_signup';
import TestimonialList from '../TestimonialComponents/TestimonialDisplay/TestimonialList';
import { thunkGetAllParagraphs } from '../../store/splashpage';
import RenderEditButton from './RenderEditButton';
import parse from 'html-react-parser';
import './SplashPage.css';

const SplashPage = ({ type }) => {
    const dispatch = useDispatch()
    const allParagraphs = useSelector(state => state.splashpage)


    useEffect(() => {
        dispatch(thunkGetAllParagraphs())
    }, [dispatch])

    if (!allParagraphs) return null

    const allParagraphsArr = Object.values(allParagraphs)
    // console.log('Paragraphs Array', allParagraphsArr[1].paragraph, typeof(allParagraphsArr[1].paragraph))
    if (!allParagraphsArr.length) return <h1>Loading...</h1>;

    const scrollToTarget = () => {
        const targetElement = document.getElementById('splash-page-top-signup');
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='splash-page-container'>
            <div className="splash-page-top-section">
                <div className='top-section-content'>
                    <Link to="/">
                        <img src={`${process.env.PUBLIC_URL}/images/icon+wordmark.png`} alt="Company Logo" className="splash-page-nav-logo" />
                    </Link>
                    <div className='top-section-about-aurora'>
                        <div className='aurora-caption'>{allParagraphsArr[0]?.header}</div>
                        <div className='aurora-intro'>{allParagraphsArr[0]?.paragraph}</div>
                        {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[0]}/>}
                        <button className='learn-more-button' onClick={scrollToTarget}>Learn more</button>
                    </div>
                </div>
                <img className="splash-page-hero-graphic" src='/images/hero-graphic.png' alt="Hero Graphic" />
            </div>
            <div id='splash-page-top-signup'>
                <TopSignup />
            </div>
            <div className='splash-page-benefits'>
                <div className='single-benefit-container'>
                    <img className='benefits-image' src='/images/benefit-1.png' alt='self-awareness' />
                    <p className='single-benefit-content-bold'>{allParagraphsArr[5]?.header}</p>
                    <p className='single-benefit-content-small'>{allParagraphsArr[5]?.paragraph}</p>
                    {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[5]}/>}
                </div>
                <div className='single-benefit-container'>
                    <img className='benefits-image' src='/images/benefit-2.png' alt='self-esteem' />
                    <p className='single-benefit-content-bold'>{allParagraphsArr[6]?.header}</p>
                    <p className='single-benefit-content-small'>{allParagraphsArr[6]?.paragraph}</p>
                    {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[6]}/>}
                </div>
                <div className='single-benefit-container'>
                    <img className='benefits-image' src='/images/benefit-3.png' alt='positive-mindset' />
                    <p className='single-benefit-content-bold'>{allParagraphsArr[7]?.header}</p>
                    <p className='single-benefit-content-small'>{allParagraphsArr[7]?.paragraph}</p>
                    {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[7]}/>}
                </div>
            </div>
            <p className='splash-page-testimonials-header'>What user testers are saying</p>
            <div className='splash-page-testimonials'>
                <div className='splash-page-testimonials-container'>
                    <img src={`${process.env.PUBLIC_URL}/images/mood-2.svg`} alt="Mood Happy" className='testimonial-mood-happy' />
                    <div className='splash-page-testimonial-container'>
                        <TestimonialList />
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/images/mood-1.svg`} alt="Mood Joy" />
                </div>
            </div>
            <div className='splash-page-screens'>
                <div className='splash-page-screen-content-container'>
                    <img src='/images/screen1.png' alt='Screen 1' className='splash-page-screen-photo' />
                    <div className='screen-content'>
                        <img src={`${process.env.PUBLIC_URL}/images/mood-joy.svg`} alt="Mood Joy" className='screens-mood' />
                        <div className='screen-content-text'>{allParagraphsArr[2]?.header}</div>
                        <div className='screen-content-paragraph'>{allParagraphsArr[2]?.paragraph}</div>
                        {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[2]}/>}
                    </div>
                </div>
                <div className='splash-page-screen-content-container'>
                    <div className='screen-content'>
                        <img src={`${process.env.PUBLIC_URL}/images/mood-afraid.svg`} alt="Mood Afraid" className='screens-mood' />
                        <div className='screen-content-text'>{allParagraphsArr[3]?.header}</div>
                        <div className='screen-content-paragraph'>{allParagraphsArr[3]?.paragraph}</div>
                        {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[3]}/>}
                    </div>
                    <img src='/images/screen2.png' alt='Screen 2' className='splash-page-screen-photo' />
                </div>
                <div className='splash-page-screen-content-container'>
                    <img src='/images/screen3.png' alt='Screen 3' className='splash-page-screen-photo' />
                    <div className='screen-content'>
                        <img src={`${process.env.PUBLIC_URL}/images/mood-sad.svg`} alt="Mood Sad" className='screens-mood' />
                        <div className='screen-content-text'>{allParagraphsArr[4]?.header}</div>
                        <div className='screen-content-paragraph'>{allParagraphsArr[4]?.paragraph}</div>
                        {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[4]}/>}
                    </div>
                </div>
            </div>
            <div className='splash-page-meet-the-founder-container'>
                <img src='/images/christinaImg.png' alt='Founder Image' className='founder-image' />
                <div className='meet-the-founder-content'>
                    <div className='meet-the-founder-header'>{allParagraphsArr[1]?.header}</div>
                    <div className='meet-the-founder-paragraph'>{allParagraphsArr[1] ? parse(allParagraphsArr[1].paragraph) : ''}</div>
                    {type === "admin" && <RenderEditButton paragraph={allParagraphsArr[1]}/>}
                </div>
            </div>
            <div id="splash-page-bottom-signup">
                <BotSignup />
            </div>
        </div>
    )
}

export default SplashPage;
