import React from "react";

import HomeItem from "./HomeItem";
import "./HomeContainer.css";
import Card from "../../shared/components/UIElements/Card";
import mainLogo from '../../shared/components/Navigation/Icons/logoa.png'
import BannerArt from '../../shared/components/Navigation/Icons/ad1.jpg'

const HomeContainer = props => {
    return (
        <div>
        <div className="home-feed">
            <HomeItem key={'home'}/>
        </div>
        </div>
        );
};

export default HomeContainer;