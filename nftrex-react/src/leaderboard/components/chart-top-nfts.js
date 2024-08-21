import React, {useEffect} from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

import "./charts.css";

const ChartWinnersNft = () => {
    useEffect(() => {
        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-hash-lotto-lsszo',
          theme: 'dark',
          background: 'transparent',
          showAttribution: false
        })

        const chart = sdk.createChart({
          chartId: 'd854ffb2-0e61-4a5f-95a3-c01d2eb97eb1',
        });

        chart.render(document.getElementById('chart-winners-nft')).catch(() => window.alert('chart failed'));                
    }, []);

      return (
          <div id="chart-winners-nft" style={{ width: '100%', height: '600px' }}></div>
      )
}

export default ChartWinnersNft;