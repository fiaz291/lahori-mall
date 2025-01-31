'use client'
import React, { useCallback, useState } from 'react';
import config from "@/app/config";
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
import axios from 'axios';

export default function SocialLogin() {
    const REDIRECT_URI = config.google_redirect_url
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

    const socialLoginApi = async (values) => {
        try {
            console.log("socialLoginApi",config.url + "/api/user/socialSignin", {provider:values.provider, accessToken:values.code},{client_id:config.google_client_id,redirect_uri:REDIRECT_URI})
            
          let result = await axios.post(config.url + "/api/user/socialSignin", {provider:values.provider, accessToken:values.code});
          console.log("result",result)
        } catch (error) {
            console.log("error",error)
        }
      };


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
                client_id={config.google_client_id}
                onLoginStart={onLoginStart}
                redirect_uri="http://localhost:3000"
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    console.log("Data set",data)
                    socialLoginApi({provider,...data})
                    /* setProvider(provider);
                    setProfile(data); */
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