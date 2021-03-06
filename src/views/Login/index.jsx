import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentUser } from '../../redux/actionCreator';
import { postUserData } from '../../redux/actionCreator/userActions';
import travelaLogo from '../../images/travela-logo.svg';
import cover from '../../images/cover.svg';
import symbolG from '../../images/Google-white.svg';
import videoSymbol from '../../images/video.svg';
import fileSymbol from '../../images/file.svg';
import './Login.scss';
import TextLink from '../../components/TextLink/TextLink';
import { loginStatus } from '../../helper/userDetails';
import Button from '../../components/buttons/Buttons';

export class Login extends Component {
  componentDidMount() {
    const {match:{params}, isAuthenticated} = this.props;
    if(params[0]){
      localStorage.setItem('url', `/${params[0]}`);
      !isAuthenticated && this.login();
    }
    this.authenticated(); 
  }

  authenticated() {
    const {  history, isAuthenticated, setCurrentUser, user, postUserData } = this.props;
    if (isAuthenticated) {
      const users = {
        fullName: user.UserInfo.name,
        email: user.UserInfo.email,
        userId: user.UserInfo.id,
        picture: user.UserInfo.picture
      };
      loginStatus();
      postUserData(users);
      if(localStorage.getItem('url')){
        history.push(`${localStorage.getItem('url')}`);
        localStorage.removeItem('url');      
      }else{
        history.push('/requests');  
      }
    }
    setCurrentUser();
  }

  login() {
    const url = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${
      process.env.REACT_APP_AUTH_REDIRECT_URL
    }`;
    window.location.replace(url);
  }

  renderLandPageImage() {
    return (
      <div className="mdl-cell mdl-cell--7-col mdl-cell--hide-tablet mdl-cell--hide-phone">
        <img
          src={cover}
          alt="Road map"
          className="login-page__landing-page-map"
        />
      </div>
    );
  }

  renderLinks() {
    const bookTrip = 'https://drive.google.com/file/d/1UasidXRo32pQscj4pVBQssrnG91Ig11S/view';
    const andelaPolicy = 'https://docs.google.com/document/d/1ZqJ3OAF-7NfJAgkzMBdiMoTrsftTWJp9tNhV8eOe1d8/edit';
    return (
      <Fragment>
        <TextLink
          imageSrc={videoSymbol}
          symbolClass="login-symbol__video"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="Video Symbol"
          text="How to book a trip"
          link={bookTrip}
        />

        <TextLink
          imageSrc={fileSymbol}
          symbolClass="login-symbol__file"
          textLinkClass="login-page__link"
          textClass="login-page__link-text"
          altText="File Symbol"
          text="Andela travel policy"
          link={andelaPolicy}
        />
      </Fragment>
    );
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout login-page">
        <div className="mdl-layout__content">
          <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--5-col mdl-cell--5-col-tablet">
              <img
                src={travelaLogo}
                alt="Andela Logo"
                className="login-page__andela-logo"
              />
              <p className="login-page__travel-request-text">
                Travel Requests Made Easier
              </p>
              <Button
                id="login"
                onClick={this.login}
                textClass="login-page__login-to-get-started-text"
                text="Login to Get Started"
                imageSrc={symbolG}
                altText="Google Symbol"
                imageClass="login-page__google-white"
                buttonType="button"
                buttonClass="mdl-button mdl-js-button mdl-button--raised mdl-button--colored login-page__login-btn"
              />
              {this.renderLinks()}
            </div>
            {this.renderLandPageImage()}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  postUserData: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  match: PropTypes.object
};

Login.defaultProps = {
  user: [],
  match:{}
};

export const mapStateToProps = ({ auth }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser, postUserData }, null, {pure: false}
)(Login);
