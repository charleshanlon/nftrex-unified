import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LottoFeed from "../components/LottoFeed";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { Box, Pagination } from "@mui/material";

const Lottos = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedRecommendations, setLoadedRecommendations] = useState([]);
    const [apiPage, setApiPage] = useState(1);
    const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://nftrex-api.titorlabs.io/api/v1';
    const { accountId } = useParams();

    useEffect(() => {
        document.title = `${accountId} | Rex`;
    }, [accountId]);

    const fetchRecommendations = async () => {
        try {
            const responseData = await sendRequest(`${baseURL}/rex/account/${accountId}`);
            setLoadedRecommendations(responseData.recommendations);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, [apiPage, accountId]); // Fetch recommendations whenever apiPage or accountId changes

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedRecommendations.length > 0 && (
                
                <LottoFeed items={loadedRecommendations} />
                
            )}
            {!isLoading && loadedRecommendations.length === 0 && (
                <div className="center">
                    <h2>No Recommendations Found!</h2>
                </div>
            )}
        </div>
    );
};

export default Lottos;