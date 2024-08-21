import React, {useEffect} from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

import "./charts.css";

const ChartWinners = () => {
    useEffect(() => {
        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-hash-lotto-lsszo',
          theme: 'dark',
          background: 'transparent',
          showAttribution: false
        })

        const chart = sdk.createChart({
          chartId: '65168b0a-00d9-41c3-8f25-0d187ef0d513',
        });

        chart.render(document.getElementById('chart-winners')).catch(() => window.alert('chart failed'));                
    }, []);

      return (
          <div id="chart-winners" style={{ width: '100%', height: '600px' }}></div>
      )
}

export default ChartWinners;