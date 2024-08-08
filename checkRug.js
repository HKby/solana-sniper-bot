const solanaWeb3 = require('@solana/web3.js');
const { Keypair, Connection, PublicKey, Transaction, SystemProgram } = solanaWeb3;
const fs = require('fs');
const axios = require('axios');
const connection = new Connection('https://api.mainnet-beta.solana.com');

/**
 * Check if the token is safe according to RugCheck
 * @param {string} tokenAddress - The token's public key
 * @returns {Promise<boolean>} - Returns true if safe, false otherwise
 */
async function checkTokenWithRugCheck(tokenAddress) {
  try {
    const response = await axios.get(`https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report/summary`);
    console.log("processing")
    const { data } = response;
    return data
  } catch (error) {
    console.error(`Error checking token with RugCheck: ${error.message}`);
    return false;
  }
}

// Parse command-line arguments to get the list of new tokens
const tokenAddress = process.argv.slice(2);

// Monitor the platform for new tokens
async function statsToken() {

    const isSafe = await checkTokenWithRugCheck(tokenAddress);

    console.log(isSafe)


}

// Set interval to monitor every 10 seconds
statsToken

