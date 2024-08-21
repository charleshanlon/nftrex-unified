import React, { useContext} from "react";
import {Link} from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import "./ProjectItem.css";


const ProjectItem = props => {
    return (
        <li className="project-item">
            <Card className="project-item__content">
                <Link to={`/lottos/project/${props.name}`}>
                    <div className="project-item__image">
                        <Avatar image={props.image} alt={props.name}/>
                    </div>
                    <div className="project-item__info">
                        <h2>{props.name}</h2>
                        <h3>
                            {props.lottosCount} {props.lottosCount === 1 ? 'Lotto' : 'Lottos'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
};

export default ProjectItem;