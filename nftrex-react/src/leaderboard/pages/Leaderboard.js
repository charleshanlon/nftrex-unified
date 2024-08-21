import React, {useEffect} from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import Card from "../../shared/components/UIElements/Card";
import ChartWinners from "../components/chart-top-winners";
import ChartVolume from "../components/chart-volume"
import ChartWinnersNft from "../components/chart-top-nfts";
import Alert from '@mui/material/Alert';

import "../components/ChartsContainer.css";

const Leaderboard = () => {
    useEffect(() => {
        document.title = `Stats | Hash Lotto`;
      }, []);

      

      return (
        <div>
        <Alert severity="warning">This stats page will be improved soon!</Alert>
        <div className="charts-container">
        <div className="charts">
        <ChartVolume/>
        </div>
        <div className="charts">
        <ChartWinners/>
        </div>
        <div className="charts">
        <ChartWinnersNft/>
        </div>
        </div>
        </div>
      );
}

export default Leaderboard;