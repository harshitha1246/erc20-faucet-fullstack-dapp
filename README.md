# ERC20 Faucet Fullstack DApp

A decentralized application for distributing ERC-20 tokens with rate limiting and lifetime claim limits.

## Architecture
- **Smart Contracts**: Solidity contracts for the ERC-20 token and the faucet mechanism.
- **Frontend**: React-based UI with ethers.js for blockchain interaction.
- **DevOps**: Dockerized setup for consistent development and deployment.

## Deployed Contracts (Sepolia)
- **Token**: [0xYourTokenAddress](https://sepolia.etherscan.io/address/0xYourTokenAddress)
- **Faucet**: [0xYourFaucetAddress](https://sepolia.etherscan.io/address/0xYourFaucetAddress)

## Quick Start
1. Clone the repository.
2. Create a `.env` file based on `.env.example`.
3. Run `docker-compose up`.
4. Access the DApp at `http://localhost:3000`.

## Design Decisions
- **Faucet Amount**: 10 FTK per request to ensure wide distribution.
- **Cooldown**: 24 hours to prevent spam.
- **Lifetime Limit**: 100 FTK per address for anti-abuse.

## Security
- ReentrancyGuard for claim functions.
- OnlyAdmin access for pause/unpause.
- Checks-Effects-Interactions pattern.
