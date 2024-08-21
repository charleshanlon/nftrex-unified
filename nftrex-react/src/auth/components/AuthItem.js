import React, { useContext, useEffect, useState } from "react";

import Card from "../../shared/components/UIElements/Card"
import "./AuthItem.css";

import HashpackLogo from '../../shared/components/Navigation/Icons/hashpack-logo.svg'
import { Button, TextareaAutosize } from "@mui/material";
import { HashconnectContext } from "../../shared/context/auth-context";
import { hashConnect } from "../../shared/hooks/hashconnect";
import CopyToClipboardButton from "../../shared/components/UIElements/CopyToClipboardButton";
import {Link} from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';

const AuthItem = props => {
    let { accountId } = useContext(HashconnectContext);
    const { topic } = useContext(HashconnectContext);
    let { pairingString } = useContext(HashconnectContext);
    const refresh = () => window.location.reload(true)

    return (
        <React.Fragment>
            <div className="outer-border">
            <li className="auth-item">
                
                <Card className="auth-item__content">
                    <div className="auth-item__header">
                        <h2>Wallet Manager</h2>
                    </div>
                    <div className="auth-item__subheader">
                        <h3>Use HashPack browser extension for best experience</h3>
                    </div>
                    <div className="auth-item__image">
                        <img src={HashpackLogo} alt = 'Hash Lotto Verified' width={100} height={100}></img>
                    </div>
                    {accountId &&
                    <div className="auth-item__status">
                            <div className="auth-item__status-label" style={{ border: '1.5px solid #444444' }}>
                            <CircleIcon sx={{ color: '#82ff71', fontSize: 16 }}/>
                            <h2>{accountId}</h2>
                        </div>
                    </div>}
                    {!accountId && !pairingString &&
                    <div className="auth-item__status">
                            <div className="auth-item__status-label" style={{ border: '1.5px solid #444444' }}>
                                <CircleIcon sx={{ color: '#ff7171', fontSize: 16 }}/>
                            <h2>Disconnected</h2>
                        </div>
                    </div>}
                    {!accountId && pairingString &&
                    <div className="auth-item__status">
                            <div className="auth-item__status-label" style={{ border: '1.5px solid #444444' }}>
                                <CircleIcon sx={{ color: '#ffe971', fontSize: 16 }}/>
                            <h2>Ready...</h2>
                        </div>
                    </div>}
                    {!accountId && <div className="auth-item__pairing">
                        {pairingString && <div>
                            <CopyToClipboardButton textToCopy={pairingString} />
                            <TextareaAutosize title="HashPack Pairing String" placeholder="Pair Wallet to generate a pairing string..." value={pairingString || ''} style={
                                { fontFamily: 'Poppins, sans-serif' }}/>
                            </div>}
                    </div>}
                    <div className="auth-item__actions">
                    {!accountId &&
                    <div>
                        {pairingString &&
                            <div className="connect-button">
                                <Button
                                    onClick={async () => {
                                        try {
                                            hashConnect.connectToLocalWallet();
                                        }
                                        catch (err) {
                                            console.log(err)
                                        }
                                    }} sx={{textTransform: 'none', color: "#fff8e7" }}
                                    >Connect
                                </Button>
                            </div>
                        }
                        {pairingString &&
                            <Button
                                onClick={async () => {
                                    try {
                                        hashConnect.clearConnectionsAndData();
                                        }
                                    catch (err) {
                                        console.log(err)
                                    }
                                }} sx={{textTransform: 'none', color: "#ff7171" }}
                                >Cancel
                            </Button>
                        }
                        {!pairingString &&
                            <Button 
                                onClick={refresh} sx={{textTransform: 'none', color: "#fff8e7" }}
                                >Initiate Pairing
                            </Button>
                        }
                    </div>}
                    {accountId && 
                        <div>
                            <Button 
                                component={Link} to={`/rex/account/${accountId}`} sx={{ textTransform: 'none', animation: 'rainbow-color 3s infinite' }}
                                >Get NFT-Rex!
                            </Button>
                            <Button 
                                onClick={async () => {
                                    try {
                                        hashConnect.disconnect(topic);
                                        hashConnect.clearConnectionsAndData();
                                    }
                                    catch (err) {
                                        console.log(err)
                                    }
                                }} sx={{textTransform: 'none', color: "#ff7171" }}
                                >Disconnect
                            </Button>
                        </div>}      
                    </div>    
                </Card>
                
            </li>
            </div>
        </React.Fragment>
    )
};

export default AuthItem;