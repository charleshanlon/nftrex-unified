const { response } = require('express');
const HttpError = require ('../models/http-error');
const axios = require('axios')

const getRexByAccount = async (req, res, next) => {
    const accountId = req.params.accountId;
    const N = req.query.N || 5;
    console.log(accountId)

    try {
        // POST request to the Flask API
        const response = await axios.post('http://10.1.96.101:5001/recommendations', {
            account_id: accountId,
            N: N
        });

        // Send Flask API res back
        res.json(
            response.data);
    } catch (err) {
        console.error('Error fetching recommendations:', err.message);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};

exports.getRexByAccount = getRexByAccount;