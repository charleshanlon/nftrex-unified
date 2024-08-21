import React, {useEffect} from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

import "./charts.css";

const ChartVolume = () => {
    useEffect(() => {
        const sdk = new ChartsEmbedSDK({
          baseUrl: 'https://charts.mongodb.com/charts-hash-lotto-lsszo',
          theme: 'dark',
          background: 'transparent',
          showAttribution: false
        })

        const chart = sdk.createChart({
          chartId: '65167baf-00d9-49a4-89a7-0d187ee75fad',
        });

        chart.render(document.getElementById('chart-volume')).catch(() => window.alert('chart failed'));                
    }, []);

      return (
          <div id="chart-volume" style={{ width: '100%', height: '100px' }}></div>
      )
}

export default ChartVolume;