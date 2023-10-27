import React from 'react';
import jQuery from 'jquery';
import butterflyIcon from './Butterfly.gif'; 

import "./signup.css"


const TopSignup = () => {
  return (
    <div id="mc_embed_shell">

       
      <div class= "top_signup">
        <form
          action="https://gmail.us21.list-manage.com/subscribe/post?u=521869c3a8a0a0f310a967b1e&amp;id=8b0b556b44&amp;f_id=0000e9e6f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div className="top_signup_box1" id="mc_embed_signup_scroll">
            <img className="top_signup_icon"src={butterflyIcon} alt="Butterfly Icon" />

            <h2 class="top_signup_text1">We’re working on bringing Aurora to life...</h2>
            <h2 class="top_signup_text2">In the meantime, become a brighter, more confident you with mini mindset shifts and daily affirmations.</h2>

            <div className="mc-field-group">
              <input
                type="email"
                name="EMAIL"
                className="email"
                placeholder="Enter your email"
                required=""
              />
                <input
                    type="submit"
                    name="subscribe"
                    className="button"
                    value="Subscribe"
                />
              <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
            </div>

            <h3 class="top_signup_text3">Show me an example</h3>


            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: 'none' }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: 'none' }}
              ></div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <input
                type="text"
                name="b_521869c3a8a0a0f310a967b1e_8b0b556b44"
                tabindex="-1"
                value=""
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">

              </div>
            </div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">
        {(function ($) {
          let fnames = new Array();
          let ftypes = new Array();
          fnames[0] = 'EMAIL';
          ftypes[0] = 'email';
        })(jQuery)}
      </script>
    </div>
  );
};

export default TopSignup;
