import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./LottoItem.css";

const LottoItem = props => {
    return (
        <div className="outer-border">
        <li className="lotto-item">
            <Card className="lotto-item__content">
                <div className="lotto-item__info">
                    <p>token name: {props.tokenName}</p>
                    <p>token id: {props.tokenId}</p>
                    <a href={`https://hashscan.io/mainnet/token/${props.tokenId}`} target="_blank" rel="noopener noreferrer">{props.NftName}hashscan</a>
                </div>
            </Card>
        </li>
        </div>
    );
};

export default LottoItem;