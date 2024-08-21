import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import "./StatsItem.css";
import lottoIcon from '../../shared/components/Navigation/Icons/checkmark-done-outline.png';
import volumeIcon from '../../shared/components/Navigation/Icons/trending-up.png';
import avgIcon from '../../shared/components/Navigation/Icons/analytics-outline.png';

const StatsItem = props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMouseLeave = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <div>
            <li className="stats-item">
                <div className="stats-item__project">
                    <h1>{props.creator}</h1>
                    <Card className="stats-item__content">
                        <div className="stats-item__header">
                            <div className="stats-item__element" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <img src={volumeIcon} alt="volume" width={16} height={10.19} className="btn__icon" />
                                <div className="stats-item__label">Volume</div>
                                <div className="hbar-value"><h2>{props.volume} ℏ</h2></div>
                                <div className="usd-value"><h2>${props.usd}</h2></div>
                            </div>
                            <div className="stats-item__element">
                                <img src={lottoIcon} alt="lottos" width={16} height={10.19} className="btn__icon" />
                                <div className="stats-item__label">Lottos</div>
                                <h2>{props.txns}</h2>
                            </div>
                            <div className="stats-item__element">
                                <img src={avgIcon} alt="average win" width={16} height={9.5} className="btn__icon" />
                                <div className="stats-item__label">AVG Award</div>
                                <div className="hbar-value"><h2>{props.average} ℏ</h2></div>
                                <div className="usd-value"><h2>${props.avgusd}</h2></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </li>
        </div>
    );
};

export default StatsItem;