import React from "react";

import AuthItem from "./AuthItem";
import "./AuthContainer.css";


const AuthContainer = props => {
    return (
        <div className="auth-feed">
            <AuthItem key={'hashpack'}/>
        </div>
        );
};

export default AuthContainer;