import { useCallback, useContext, useState, useEffect } from 'react';
import { HashConnect } from "hashconnect";
import { HashconnectContext } from '../context/auth-context';

// hashconnect client - true for debugging
export const hashConnect = new HashConnect(true);

const getPairingInfo = () => {
    if (hashConnect.hcData.pairingData.length > 0) {
      return hashConnect.hcData.pairingData[hashConnect.hcData.pairingData.length - 1];
    }
  }

const getPairingString = () => {
    if (hashConnect.hcData.pairingString){
      const pairingString = hashConnect.hcData.pairingString
      return pairingString
    }
  }

export const HashConnectClient = () => {
    // use the HashpackContext to keep track of the hashpack account and connection
    const { setAccountId, setTopic, setIsConnected, setPairingString } = useContext(HashconnectContext);
    const [initResult, setInitResult] = useState(null);

    const initializeHashConnect = async () => {
      const appMetadata = {
          name: "NFT Rex",
          description: "Built by Titor Labs",
          icon: "https://i.imgur.com/mWcvm73.png"
      };
      const result = await hashConnect.init(appMetadata, "mainnet", true);
      //console.log('init', result.pairingString);
      setPairingString(result.pairingString);
      setInitResult(result);
  };
  
    // sync the hashconnect state with the context
    const syncWithHashConnect = useCallback(() => {
      const accountId = getPairingInfo()?.accountIds[0];
      const topic = getPairingInfo()?.topic;
      const pairingString = getPairingString();
      if (accountId) {
        setAccountId(accountId);
        setIsConnected(true);
        setTopic(topic);
        setPairingString(pairingString)
      } else {
        setAccountId('');
        setIsConnected(false);
        setTopic('');
        setPairingString(pairingString)
      }
      //console.log('synced', HashconnectContext)
    }, [setAccountId, setTopic, setIsConnected, setPairingString]);
  
    useEffect(() => {
      // when the component renders, sync the hashconnect state with the context
      syncWithHashConnect();
      // when hashconnect is initialized, sync the hashconnect state with the context
      
      initializeHashConnect().then(syncWithHashConnect);
      // when pairing an account, sync the hashconnect state with the context
      
      hashConnect.pairingEvent.on(syncWithHashConnect);
  
      // when the connection status changes, sync the hashconnect state with the context
      hashConnect.connectionStatusChangeEvent.on(syncWithHashConnect)
  
      return () => {
        // remove the event listeners when the component unmounts
        hashConnect.pairingEvent.off(syncWithHashConnect);
        hashConnect.connectionStatusChangeEvent.off(syncWithHashConnect);
      }
    }, [syncWithHashConnect]);
    return null;
  };