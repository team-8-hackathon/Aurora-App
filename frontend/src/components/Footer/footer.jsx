import React from 'react';
import './footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icons">
                <a href="https://www.tiktok.com/@aurorahelps" target='_blank'>
                    <img src={`${process.env.PUBLIC_URL}/images/tiktok.svg`} alt="TikTok Icon" />
                </a>
                <a href="https://www.instagram.com/aurorahelps/" target='_blank'>
                    <img src={`${process.env.PUBLIC_URL}/images/ig.svg`} alt="Instagram Icon" />
                </a>
            </div>
            <div className="footer-text">
                © 2023 Aurora Helps LLC
            </div>
            <div className="footer-links">
                <a href="/">Terms of Use</a>
                <a href="/">Privacy Policy</a>
            </div>
        </footer>
    );
}

export default Footer;
