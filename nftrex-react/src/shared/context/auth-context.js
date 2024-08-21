import { createContext, useState } from "react";

const defaultValue = {
  accountId: '',
  setAccountId: (newValue) => { },
  topic: '',
  setTopic: (newvalue) => { },
  pairingString: '',
  setPairingString: (newValue) => { },
  isConnected: false,
  setIsConnected: (newValue) => { }
}

export const HashconnectContext = createContext(defaultValue);

export const HashconnectContextProvider = (props) => {
  const [accountId, setAccountId] = useState(defaultValue.accountId);
  const [topic, setTopic] = useState(defaultValue.topic);
  const [pairingString, setPairingString] = useState(defaultValue.pairingString);
  const [isConnected, setIsConnected] = useState(defaultValue.isConnected);

  return (
    <HashconnectContext.Provider
      value={{
        accountId,
        setAccountId,
        topic,
        setTopic,
        pairingString,
        setPairingString,
        isConnected,
        setIsConnected
      }}
    >
      {props.children}
    </HashconnectContext.Provider>
  )
}