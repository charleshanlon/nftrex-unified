import React, { useContext, useEffect, useState } from "react";
import { HashconnectContext } from "../../shared/context/auth-context";
import { ThreeBody, Ripples, Jelly, JellyTriangle } from '@uiball/loaders'
import LottoFeed from "../../lottos/components/LottoFeed";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import Ad from '../../shared/components/Navigation/Icons/ad.jpg'
import StreamOutlinedIcon from '@mui/icons-material/StreamOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';


import "./HomeItem.css";

const HomeItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedLotto, setLoadedLotto] = useState();
    const [loadedProject, setLoadedProject] = useState();
    let { accountId } = useContext(HashconnectContext);

    const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://hashlotto-api.titorlabs.io/api/v1';

    useEffect(() => {
        // set tab title accordingly
        document.title = "Home | Hash Lotto";

        const fetchLotto = async () => {
            try {
                const responseData = await sendRequest(`${baseURL}/lottos/global`);
                setLoadedLotto([responseData.lottos[responseData.lottos.length - 1]])
                console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);
            } catch (err) {
                console.log('err');
            }
        };
        fetchLotto();
      

      const fetchProject = async () => {
        try {
            const responseData = await sendRequest(`${baseURL}/projects`);
            setLoadedProject([responseData.projects[0].creator, responseData.projects[0].image])
        } catch (err) {
            console.log(err);
        }
    };
    fetchProject();
    }, [sendRequest]);

    return (

        <div>
            <ErrorModal justifyContent={"center"} error={error} onClear={clearError}/>
            {isLoading && 
            <div className="load-container" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: '10rem'
            }}>
            <ThreeBody size={35} speed={1.1} color="#242424"/>
            </div>} {!isLoading &&
            <div className="home-item">
                <div className="left-section">
                    <h4>Feautured Project</h4>
                    <div className="box-1">{!isLoading && loadedProject && <a href={`/lottos/project/${loadedProject[0]}`} className="full-box-link"><div className="featured-project"><img src={loadedProject[1]} /><div className="featured-text">
                        <WhatshotOutlinedIcon className="circle-image" sx={{scale: "1.3", color: "#141414"}} />
                        <h4>{loadedProject[0]}</h4>
                    </div></div></a>}</div>
                    <h4>News</h4>
                    <a href='https://forms.gle/EPJkNumPYKjDDMEe6' target="_blank" className="full-box-link">
                    <div className="box-2"><img src={Ad} />
                    <div className="news-content">
                        <h4>Hedera Project Owner?</h4>
                        <h5>Give back to your holders with Hash Lotto!</h5>
                        <StreamOutlinedIcon fontSize="small" sx={{scale: "1.3", color: "#ccff00"}}  />
                    </div></div></a>
                    <h4>Roadmap</h4>
                    <div className="box-3"><ul className="feature-list">
                        <li>
                            <RadioButtonCheckedOutlinedIcon sx={{color: "#ccff00"}} fontSize="inherit"/> Hash Lotto beta launch
                        </li>
                        <li>
                            <RadioButtonUncheckedOutlinedIcon sx={{color: "#ccff00"}} fontSize="inherit" /> Partner with verified Hedera NFT projects
                        </li>
                        <li>
                            <RadioButtonUncheckedOutlinedIcon sx={{color: "#ccff00"}} fontSize="inherit" /> Leaderboard/Stats page overhaul
                        </li>
                        <li>
                            <RadioButtonUncheckedOutlinedIcon  sx={{color: "#ccff00"}} fontSize="inherit" /> UI Updates
                        </li>
                        <li>
                            <RadioButtonUncheckedOutlinedIcon sx={{color: "#ccff00"}} fontSize="inherit" /> Quarterly lottos open to the Hedera community
                        </li>
                        <li>
                            <RadioButtonUncheckedOutlinedIcon sx={{color: "#ccff00"}} fontSize="inherit" /> Much more TBD!
                        </li>
                        {/* Add more features as needed */}
                    </ul></div>
                </div>
                    <div className="right-box">
                    <h4>Recent Win</h4>
                    {!isLoading && loadedLotto && <LottoFeed className="recent-lotto" items={loadedLotto} />}
                </div>
                </div>}
                <div className="faq">
                <h4>NFT-Rex FAQs</h4>
                    <Accordion className="accordian">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ color: '#242424', backgroundColor: '#fff8e7', fontFamily: 'Poppins, sans-serif' }}
                        >
                        <Typography style={{ color: '#242424', backgroundColor: '#fff8e7', fontFamily: 'Poppins, sans-serif' }}>How does NFT-Rex Work?</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ color: '#fff8e7', backgroundColor: '#fff8e7', fontFamily: 'Poppins, sans-serif' }}>
                        <Typography style={{ color: '#242424', backgroundColor: '#fff8e7', fontFamily: 'Poppins, sans-serif' }}>
                        Poop Shit
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordian">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ color: '#fff8e7', backgroundColor: '#141414', fontFamily: 'Poppins, sans-serif' }}
                        >
                        <Typography style={{ color: '#fff8e7', backgroundColor: '#141414', fontFamily: 'Poppins, sans-serif' }}>Is Hash Lotto done?</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ color: '#fff8e7', backgroundColor: '#141414', fontFamily: 'Poppins, sans-serif' }}>
                        <Typography style={{ color: '#fff8e7', backgroundColor: '#141414', fontFamily: 'Poppins, sans-serif' }}>
                        No. This is an early version of Hash Lotto. We plan to add much more features in the near future, unintended bugs may occur.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    </div>
                </div>

    )
};

export default HomeItem;