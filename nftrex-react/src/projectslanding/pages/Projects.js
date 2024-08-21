import React, {useState, useEffect} from "react";

import ProjectsList from "../components/ProjectsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { ThreeBody } from '@uiball/loaders'
import { Box } from "@mui/material";


const Projects = () => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedProjects, setLoadedProjects] = useState();
    const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://hashlotto-api.titorlabs.io/api/v1';

    useEffect(() => {
        document.title = "Hash Lotto | Projects";
        const fetchProjects = async () => {
            try {
                const responseData = await sendRequest(`${baseURL}/projects`);
                setLoadedProjects(responseData.projects);
            }
            catch (err) {
                console.log(err)
            }
            };
        fetchProjects();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <div className="center">
                    <h2>Data source coming soon!</h2>
                </div>
        </React.Fragment>
    )
};

export default Projects;