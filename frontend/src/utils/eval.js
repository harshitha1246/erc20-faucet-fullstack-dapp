import { ethers } from 'ethers';

const FAUCET_ABI = [
    "function requestTokens() external",
    "function canClaim(address user) public view returns (bool)",
    "function remainingAllowance(address user) public view returns (uint256)",
    "function isPaused() public view returns (bool)"
];

const TOKEN_ABI = [
    "function balanceOf(address account) external view returns (uint256)"
];

window.__EVAL__ = {
    connectWallet: async () => {
        if (!window.ethereum) throw new Error("No wallet found");
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    },
    requestTokens: async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const faucet = new ethers.Contract(import.meta.env.VITE_FAUCET_ADDRESS, FAUCET_ABI, signer);
        const tx = await faucet.requestTokens();
        await tx.wait();
        return tx.hash;
    },
    getBalance: async (address) => {
        const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        const token = new ethers.Contract(import.meta.env.VITE_TOKEN_ADDRESS, TOKEN_ABI, provider);
        const balance = await token.balanceOf(address);
        return balance.toString();
    },
    canClaim: async (address) => {
        const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        const faucet = new ethers.Contract(import.meta.env.VITE_FAUCET_ADDRESS, FAUCET_ABI, provider);
        return await faucet.canClaim(address);
    },
    getRemainingAllowance: async (address) => {
        const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        const faucet = new ethers.Contract(import.meta.env.VITE_FAUCET_ADDRESS, FAUCET_ABI, provider);
        const allowance = await faucet.remainingAllowance(address);
        return allowance.toString();
    },
    getContractAddresses: async () => {
        return {
            token: import.meta.env.VITE_TOKEN_ADDRESS,
            faucet: import.meta.env.VITE_FAUCET_ADDRESS
        };
    }
};
