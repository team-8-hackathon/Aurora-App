// import React from 'react';
// import './footer.css';

// const Footer = () => {
//     const isMobile = window.innerWidth <= 768;

//     return (
//         <footer className={`footer ${isMobile ? 'mobile' : ''}`}>
//             <div className="footer-icons">
//                 <div className="social-icon">
//                     <a href="https://www.tiktok.com/@aurorahelps" target="_blank">
//                         <img src={`${process.env.PUBLIC_URL}/images/tiktok.svg`} alt="TikTok Icon" />
//                     </a>
//                 </div>
//                 <div className="social-icon">
//                     <a href="https://www.instagram.com/aurorahelps/" target="_blank">
//                         <img src={`${process.env.PUBLIC_URL}/images/ig.svg`} alt="Instagram Icon" />
//                     </a>
//                 </div>
//             </div>
//             <div className="footer-links">
//                 <a href="/">Terms of Use</a>
//                 <a href="/">Privacy Policy</a>
//                 <div>© 2023 Aurora Helps LLC</div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;


import React from 'react';
import './footer.css';

const Footer = () => {
    const isMobile = window.innerWidth <= 768;

    return (
        <footer className={`footer ${isMobile ? 'mobile' : ''}`}>
            <div className="footer-icons">
                <div className="social-icon">
                    <a href="https://www.tiktok.com/@aurorahelps" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/images/tiktok.svg`} alt="TikTok Icon" />
                    </a>
                </div>
                <div className="social-icon">
                    <a href="https://www.instagram.com/aurorahelps/" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/images/ig.svg`} alt="Instagram Icon" />
                    </a>
                </div>
            </div>
            <div className="footer-center">
                © 2023 Aurora Helps LLC
            </div>
            <div className="footer-links">
                <a href="/">Terms of Use</a>
                <a href="/">Privacy Policy</a>
            </div>
        </footer>
    );
};

export default Footer;
