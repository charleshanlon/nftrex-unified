from flask import Flask, request, jsonify
import json
from urllib.request import urlopen
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

def load_data(file_path="data.csv"):
    df = pd.read_csv(file_path)
    tt_df = df.T
    tt_header = tt_df.iloc[0]
    tt_df = tt_df[1:]
    tt_df.columns = tt_header
    cos_sim_tokens = cosine_similarity(tt_df)
    df_sim_tokens = pd.DataFrame(cos_sim_tokens, index=tt_df.index, columns=tt_df.index)
    clean_df = df
    clean_df.set_index('account id', inplace=True)
    clean_df.index.name = None
    return clean_df, df_sim_tokens

def recommend_similar_tokens(account_id, data, cos_sim_matrix, N=5):
    owned = data.columns[data.loc[account_id] > 0]
    recommendations = {}
    for token in owned:
        similar_tokens = cos_sim_matrix[token].sort_values(ascending=False)
        for similar_token, similarity_score in similar_tokens.items():
            if data.loc[account_id, similar_token] > 0:
                continue
            if similar_token in recommendations:
                recommendations[similar_token] += similarity_score
            else:
                recommendations[similar_token] = similarity_score
    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    return [token for token, score in sorted_recommendations[:int(N)]]  # Convert N to integer here

def get_token_names(token_ids):
    """Function that converts token IDs to token names through the Hedera API."""
    res = []
    for token_id in token_ids:
        url = f"https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/{token_id}"
        try:
            with urlopen(url) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode())
                    res.append(data.get("name", "No name found"))
                else:
                    res.append("Unable to fetch name")
        except Exception as e:
            res.append(f"Error: {e}")
    return res

# Load data and initialize model
clean_df, df_sim_tokens = load_data("data.csv")

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    account_id = data['account_id']
    N = data.get('N', 5)
    recommended_token_ids = recommend_similar_tokens(account_id, clean_df, df_sim_tokens, int(N))
    token_names = get_token_names(recommended_token_ids)
    
    # Combine token IDs and names in the response
    recommendations = [{"token_id": token_id, "token_name": token_name} 
                       for token_id, token_name in zip(recommended_token_ids, token_names)]
    
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)