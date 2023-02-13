import { Button } from 'bootstrap';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {
  return (
    <div>
      <Helmet>
        <title>Forgot Password </title>
      </Helmet>
      <h1>Forgot Password Instructions</h1>
      <p>
        If you forgotten your password, then click on the send mail button given
        below and match it with the same Gmail Id with which you have created an
        account on our website, or message us with our telegram channel.
      </p>
      <p>
        Query through Gmail : Your send mail will be replied within 4 to 6 Hours
        <button className="mbutton" type="button">
          <a className="linkstyle3" href="mailto:help.vashishthmart@gmail.com">
            {' '}
            Send Mail{' '}
          </a>
        </button>{' '}
        to recover your password.{' '}
      </p>
      <p>
        {' '}
        Query through Telegram ( Your problem will be solved within 20 minutes
        ): Telegram Channel : VashishthMart
        <button className="mbutton" type="button">
          <a className="linkstyle3" href="https://t.me/vashishthmart">
            Click Here
          </a>
        </button>{' '}
        for directly go to the Telegram.{' '}
      </p>{' '}
      <br />
      <p>
        If you do not want to follow these methods, then create a new account
        with new Gmail ID.
      </p>{' '}
      <br />
      Sincerely, The VashishthMart Team
    </div>
  );
};

export default ForgotPassword;
