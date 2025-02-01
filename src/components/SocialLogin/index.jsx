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
import { store } from "@/app/store";
import { message } from "antd";
import { setCookie } from "cookies-next";

export default function SocialLogin() {
    const REDIRECT_URI = "http://localhost:3000"
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState();
    console.log({provider, profile})
    const onLoginStart = useCallback(() => {
    }, []);

    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
        alert('logout success');
    }, []);

    const onLogout = useCallback(() => { }, []);

    const socialLoginApi = async (data) => {
        try {
            console.log("socialLoginApi",data)
            let obj = {}
            if(data.provider == "google")
                obj={provider:data.provider, dataSet:{code:data.code}}
            if(data.provider == "facebook")
                obj={provider:data.provider, dataSet:data}
          let response = await axios.post(config.url + "/api/user/socialSignin", obj);
          setCookie("user", response.data.data);
            setCookie("token", response.data.data.token);
      store.setState(() => {
        return {
          user: response.data.data,
        };
      });
      message.success("Welcome");
        } catch (error) {
            console.log("error",error)
        }
      };


    return (
        <div className="social-container">
            <LoginSocialFacebook
                appId={process.env.NEXT_PUBLIC_FACEBOOKD_ID || ''}
                fieldsProfile={
                    'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                }
                onLoginStart={onLoginStart}
                onLogoutSuccess={onLogoutSuccess}
                redirect_uri={REDIRECT_URI}
                onResolve={({ provider, data }) => {
                    console.log("Fascebook",provider, data)
                    socialLoginApi({ provider, ...data })
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
                redirect_uri={REDIRECT_URI}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    console.log("Data set",data)
                    socialLoginApi({provider,...data})
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
                    console.log("Data set",data)
                    socialLoginApi({provider,...data})
                   
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