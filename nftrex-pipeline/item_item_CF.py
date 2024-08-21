import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def load_data(file_path="data.csv"):
    """Load the data and prepare it for cosine similarity computation."""
    df = pd.read_csv(file_path)
    
    # Transpose the dataframe and set the header
    tt_df = df.T
    tt_header = tt_df.iloc[0]  # grab the first row for the header
    tt_df = tt_df[1:]  # take the data less the header row
    tt_df.columns = tt_header  # set the header row as the df header

    # Calculate cosine similarity between tokens
    cos_sim_tokens = cosine_similarity(tt_df)
    df_sim_tokens = pd.DataFrame(cos_sim_tokens, index=tt_df.index, columns=tt_df.index)
    
    # Clean and prepare data
    clean_df = df
    clean_df.set_index('account id', inplace=True)
    clean_df.index.name = None
    print(clean_df)
    
    return clean_df, df_sim_tokens

def recommend_similar_tokens(account_id, data, cos_sim_matrix, N=5):
    """Generate token recommendations for a given account ID."""
    # Get tokens the user already owns
    owned = data.columns[data.loc[account_id] > 0]
    # Dict to store potential recommendations and scores
    recommendations = {}

    for token in owned:
        # Get similar tokens
        similar_tokens = cos_sim_matrix[token].sort_values(ascending=False)
        for similar_token, similarity_score in similar_tokens.items():
            # Skip if already owned
            if data.loc[account_id, similar_token] > 0:
                continue
            # Update score for this token in the recommendations
            if similar_token in recommendations:
                recommendations[similar_token] += similarity_score
            else:
                recommendations[similar_token] = similarity_score
    # Sort recommendations by score
    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    # Return top recommendations
    return [token for token, score in sorted_recommendations[:N]]

def main():
    # Initialize the model and load data
    print("Loading data...")
    clean_df, df_sim_tokens = load_data("data.csv")
    print("Data loaded successfully.")
    
    # Test with a sample account ID
    account_id3 = '0.0.478193'
    print(f"Generating recommendations for account ID: {account_id3}")
    result = recommend_similar_tokens(account_id3, clean_df, df_sim_tokens, N=8)
    
    print("Recommendations:")
    print(result)

if __name__ == "__main__":
    main()