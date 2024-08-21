import pandas as pd

df = pd.read_csv('balances.csv')
print(df)
account_token_counts = df.groupby('accountId')['tokenId'].nunique()
filtered_accountIds = account_token_counts[account_token_counts >= 3].index
filtered_df = df[df['accountId'].isin(filtered_accountIds)]
filtered_df.to_csv('filtered_balances.csv', index=False)
print(f"Filtered data saved to 'filtered_balances.csv'.")