import requests # type: ignore
import time
import json
import aiohttp # type: ignore
import asyncio

async def fetch_json(session, url, depth=0, retries=5):
    if depth >= retries:
        return None
    depth += 1
    try:
        async with session.get(url) as response:
            if response.status != 200:
                await asyncio.sleep(0.5 * depth)
                return await fetch_json(session, url, depth)
            return await response.json()
    except Exception as e:
        await asyncio.sleep(0.5 * depth)
        return await fetch_json(session, url, depth)

async def get_token_balances(session, base_url, curr_token, bal_limit, index, results):
    check_url = f'/api/v1/tokens/{curr_token}/balances?account.balance=gt%3A0&limit=100&order=asc'
    token_bal = await fetch_json(session, base_url + check_url)
    results[index] = (curr_token, len(token_bal['balances']))

async def get_all_tokens(bal_limit):
    tokens = []
    base_url = 'https://mainnet-public.mirrornode.hedera.com'
    end_url = '/api/v1/tokens?limit=100&order=asc&type=NON_FUNGIBLE_UNIQUE'

    async with aiohttp.ClientSession() as session:
        while end_url:
            token_list = await fetch_json(session, base_url + end_url)

            if token_list is None:
                print(f'Error @{base_url + end_url}')
            else:
                tasks = []
                results = [None] * len(token_list['tokens'])  # List to store results in order
                for index, token in enumerate(token_list['tokens']):
                    curr_token = token['token_id']
                    tasks.append(get_token_balances(session, base_url, curr_token, bal_limit, index, results))
                
                await asyncio.gather(*tasks)

                # Print results in the original order
                for curr_token, balance_count in results:
                    print(f'Token: {curr_token}, Balance count: {balance_count}')
                    if balance_count >= bal_limit:
                        tokens.append(curr_token)

                print('Valid Tokens:', tokens)

            end_url = token_list['links']['next']

    return tokens
# Function to save gathered tokens to a file
def save_gathered_tokens(tokens, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(tokens, file)
    print("The file was saved!")

# Function to read tokens from a JSON file
def read_gathered_tokens(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to get all accounts that own tokens
async def get_all_accounts(tokens):
    base_url = 'https://mainnet-public.mirrornode.hedera.com'
    async with aiohttp.ClientSession() as session:
        # Loop through all tokens
        for i, token in enumerate(tokens):
            end_url = f'/api/v1/tokens/{token}/balances?account.balance=gt%3A0&limit=100&order=asc'
            print(token)
            print(f'{i + 1} / {len(tokens)}')
            while end_url:
                balance_list = await fetch_json(session, base_url + end_url)
                if balance_list is None:
                    print(f'Error @{base_url + end_url}')
                else:
                    for balance in balance_list['balances']:
                        curr = f"{balance['account']}, {token}, {balance['balance']}\n"
                        with open('balances.csv', 'a', encoding='utf-8') as file:
                            file.write(curr)
                end_url = balance_list['links']['next']

# Main function
def main():
    # Uncomment the following lines to fetch and save new tokens
    #all_tokens = asyncio.run(get_all_tokens(40))
    #save_gathered_tokens(all_tokens, 'all_tokens.json')
    all_tokens_saved = read_gathered_tokens('all_tokens.json')
    print(f'Unique NFTs: {len(all_tokens_saved)}')
    asyncio.run(get_all_accounts(all_tokens_saved))

if __name__ == "__main__":
    main()