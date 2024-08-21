import React, {useEffect} from "react";
import HomeContainer from "../components/HomeContainer";
import LottoFeed from "../../lottos/components/LottoFeed";



const Home = () => {
    useEffect(() => {
        document.title = `NFT-Rex | Rawr xD`;
      }, []);

    return (<div><HomeContainer/></div>);
}

export default Home;