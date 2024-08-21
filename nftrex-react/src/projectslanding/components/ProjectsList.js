import React from "react";

import ProjectItem from "./ProjectItem";
import "./ProjectsList.css";
import Card from "../../shared/components/UIElements/Card";

const ProjectsList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No Projects Found</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className={`projects-list ${props.className}`}>
            {props.items.map(project => (
                <ProjectItem key={project.id} 
                id={project.id} 
                image={project.image} 
                name={project.creator} 
                lottosCount={project.lottos.length}/>
            ))}
        </ul>
    );
};

export default ProjectsList;