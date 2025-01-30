'use client'
import React, { useCallback, useState } from 'react';

import {
    LoginSocialGoogle,
    LoginSocialTiktok,
    LoginSocialFacebook,
    LoginSocialInstagram,
} from 'reactjs-social-login';

import {
    FacebookLoginButton,
    GoogleLoginButton,
    InstagramLoginButton,
    TikTokLoginButton
} from 'react-social-login-buttons';
import './styles.css';

export default function SocialLogin() {
    const REDIRECT_URI =
        'https://localhost:3000/login';
    // const REDIRECT_URI = 'http://localhost:3000/account/login'

    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState();
    console.log({provider, profile})
    const onLoginStart = useCallback(() => {
        alert('login start');
    }, []);

    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
        alert('logout success');
    }, []);

    const onLogout = useCallback(() => { }, []);


    return (
        <div className="social-container">
            <LoginSocialFacebook
                appId={process.env.REACT_APP_FB_APP_ID || ''}
                fieldsProfile={
                    'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                }
                onLoginStart={onLoginStart}
                onLogoutSuccess={onLogoutSuccess}
                redirect_uri={REDIRECT_URI}
                onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>

            <LoginSocialGoogle
                client_id={process.env.REACT_APP_GG_APP_ID || '7641665807-ls8p6lvhopn0gdr5t235vki80gq1m5s6.apps.googleusercontent.com'}
                onLoginStart={onLoginStart}
                redirect_uri={REDIRECT_URI}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
            <LoginSocialInstagram
                client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
                client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
                redirect_uri={REDIRECT_URI}
                onLoginStart={onLoginStart}
                onLogoutSuccess={onLogoutSuccess}
                onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                }}
                onReject={(err) => {
                    console.log(err);
                }}
            >
                <InstagramLoginButton />
            </LoginSocialInstagram>
            <LoginSocialTiktok
                client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
                client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
                redirect_uri={REDIRECT_URI}
                onLoginStart={onLoginStart}
                onLogoutSuccess={onLogoutSuccess}
                onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                }}
                onReject={(err) => {
                    console.log(err);
                }}
            >
                <TikTokLoginButton />
            </LoginSocialTiktok>
        </div>
    )
}