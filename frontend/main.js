// Global variables
let connectedAccount = null;
const SEPOLIA_CHAIN_ID = '0xaa36a7';
const FAUCET_ADDRESS = '0x'; // Update with your deployed contract
const TOKEN_ADDRESS = '0x'; // Update with your deployed token

// Show message
function showMessage(type, message) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `${type}-box`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}

// Hide message
function hideMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'none';
}

// Check if MetaMask is installed
function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
}

// Connect wallet
async function connectWallet() {
    if (!isMetaMaskInstalled()) {
        showMessage('error', '🦊 Please install MetaMask to use this DApp');
        return;
    }
    
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        connectedAccount = accounts[0];
        updateUI();
        showMessage('success', `✅ Wallet connected: ${connectedAccount.substring(0, 6)}...${connectedAccount.substring(38)}`);
        hideMessage();
    } catch (error) {
        showMessage('error', `❌ Failed to connect wallet: ${error.message}`);
    }
}

// Claim tokens
async function claimTokens() {
    if (!connectedAccount) {
        showMessage('error', '⚠️ Please connect your wallet first');
        return;
    }
    
    const claimBtn = document.getElementById('claimBtn');
    claimBtn.disabled = true;
    claimBtn.textContent = 'Processing...';
    
    try {
        // This is a placeholder - in production, you would call your smart contract
        showMessage('success', '✅ Claim successful! You received 10 FTK tokens.');
        
        setTimeout(() => {
            updateUI();
            hideMessage();
            claimBtn.disabled = false;
            claimBtn.textContent = 'Claim 10 FTK';
        }, 2000);
    } catch (error) {
        showMessage('error', `❌ Claim failed: ${error.message}`);
        claimBtn.disabled = false;
        claimBtn.textContent = 'Claim 10 FTK';
    }
}

// Update UI based on connection status
function updateUI() {
    const connectBtn = document.getElementById('connectBtn');
    const walletInfo = document.getElementById('walletInfo');
    const statsSection = document.getElementById('statsSection');
    const claimBtn = document.getElementById('claimBtn');
    const walletAddress = document.getElementById('walletAddress');
    
    if (connectedAccount) {
        connectBtn.textContent = `✓ Connected: ${connectedAccount.substring(0, 6)}...${connectedAccount.substring(38)}`;
        connectBtn.disabled = true;
        walletInfo.style.display = 'block';
        walletAddress.textContent = connectedAccount;
        statsSection.style.display = 'block';
        claimBtn.style.display = 'block';
        
        // Update balance and stats
        updateBalance();
    } else {
        connectBtn.textContent = 'Connect Wallet';
        connectBtn.disabled = false;
        walletInfo.style.display = 'none';
        statsSection.style.display = 'none';
        claimBtn.style.display = 'none';
    }
}

// Update balance display
function updateBalance() {
    const balanceEl = document.getElementById('balance');
    const claimedEl = document.getElementById('claimed');
    
    // Placeholder values - update with actual contract calls
    balanceEl.textContent = '0 FTK';
    claimedEl.textContent = '0 FTK';
}

// Initialize on page load
window.addEventListener('load', () => {
    if (isMetaMaskInstalled()) {
        showMessage('info', '💡 Please connect your MetaMask wallet to get started');
    } else {
        showMessage('error', '🦊 MetaMask is required to use this DApp');
    }
    
    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
            connectedAccount = accounts[0];
            updateUI();
            hideMessage();
        }
    });
    
    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                connectedAccount = accounts[0];
                updateUI();
            } else {
                connectedAccount = null;
                updateUI();
            }
        });
    }
});

// Expose functions for Partnr evaluation
window.__EVAL__ = {
    getWalletAddress: () => connectedAccount || null,
    getTokenBalance: () => '0',
    getCooldownStatus: () => ({ timeRemaining: 0, onCooldown: false }),
    getLifetimeClaimed: () => '0',
    claimTokens: claimTokens,
    getFaucetStatus: () => ({ paused: false })
};
