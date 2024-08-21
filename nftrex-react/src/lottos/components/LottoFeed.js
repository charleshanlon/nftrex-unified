import React from "react";
import LottoItem from "./LottoItem";
import "./LottoFeed.css";

const LottoFeed = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No Recommendations Found!</h2>
            </div>
        );
    }

    return (
        <ul className="lottos-feed">
            {props.items.map((item, index) => (
                <LottoItem
                    key={index}
                    tokenId={item.token_id}
                    tokenName={item.token_name}
                />
            ))}
        </ul>
    );
};

export default LottoFeed;