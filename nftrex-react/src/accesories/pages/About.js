import React, {useEffect} from "react";
import './About.css'


const About = () => {
    useEffect(() => {
        document.title = `Hash Lotto | About`;
      }, []);

    return (
      <div className='about-page'>
        <h1>TODO</h1>
      </div>
    );
}

export default About;