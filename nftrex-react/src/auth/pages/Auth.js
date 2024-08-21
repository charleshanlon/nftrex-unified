import React, {useEffect} from "react";
import AuthItem from "../components/AuthItem";
import AuthContainer from "../components/AuthContainer";


const Auth = () => {
    useEffect(() => {
        document.title = `rawr xD | nft-rex`;
      }, []);

    return (<div><AuthContainer/></div>);
}

export default Auth;