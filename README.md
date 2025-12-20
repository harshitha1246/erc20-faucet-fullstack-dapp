# ERC20 Faucet Fullstack DApp

## Overview

A decentralized application for distributing ERC-20 tokens with rate limiting, cooldown periods, and lifetime claim limits. This fullstack dApp enables users to claim tokens from a faucet with built-in security measures and proper error handling.

## Key Features

- **ERC-20 Token Distribution**: Smart contract-based token faucet mechanism
- **Rate Limiting**: 24-hour cooldown period between claims per wallet
- **Lifetime Limits**: 100 token maximum claim limit per wallet
- **Admin Controls**: Pause/resume functionality for faucet management
- **Security**: ReentrancyGuard protection against reentrancy attacks
- **Frontend UI**: React-based user interface with ethers.js integration
- **Docker Support**: Containerized deployment for consistent environments

## Architecture

### Smart Contracts
- **Token.sol**: ERC-20 token implementation with minting capabilities
- **TokenFaucet.sol**: Faucet contract handling token distribution with claim tracking and rate limiting

### Frontend
- **React Application**: Modern UI with Viem/ethers.js for blockchain interaction
- **Wallet Integration**: MetaMask and other Web3 wallet support
- **Real-time Updates**: Live token balance and claim status display

### DevOps
- **Docker Compose**: Multi-container setup for local development
- **Hardhat**: Development environment for contract compilation and testing
- **Deployment Scripts**: Automated contract deployment to Sepolia testnet

## Repository Structure

```
erc20-faucet-fullstack-dapp/
├── contracts/
│   ├── Token.sol                    # ERC-20 token contract
│   └── TokenFaucet.sol              # Faucet contract
├── frontend/
│   ├── src/
│   │   ├── utils/
│   │   │   └── eval.js              # Evaluation interface functions
│   │   └── ...
│   └── ...
├── scripts/
│   └── deploy.js                    # Deployment script
├── test/
│   └── TokenFaucet.test.js          # Comprehensive test suite
├── hardhat.config.js                # Hardhat configuration
├── docker-compose.yml               # Docker container setup
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## Deployed Contracts (Sepolia Testnet)

- **Token Contract**: [0xYourTokenAddress](https://sepolia.etherscan.io/address/0xYourTokenAddress)
- **TokenFaucet Contract**: [0xYourFaucetAddress](https://sepolia.etherscan.io/address/0xYourFaucetAddress)

## Design Decisions

### Faucet Amount
**Value**: 10 FTK per claim
**Rationale**: Ensures wide token distribution while preventing excessive inflation and allowing multiple users to participate

### Cooldown Period  
**Value**: 24 hours (86400 seconds)
**Rationale**: Prevents spam and abuse while allowing users one daily claim opportunity

### Lifetime Limit
**Value**: 100 FTK per wallet address
**Rationale**: Controls total token distribution per user while allowing reasonable accumulation for testing and development

## Security Measures

1. **ReentrancyGuard**: Protects claim function against reentrancy attacks
2. **OnlyAdmin Access**: Pause/unpause functions restricted to contract owner
3. **Checks-Effects-Interactions Pattern**: Follows Solidity best practices for secure contract interaction
4. **Cooldown Tracking**: Prevents repeated claims within the cooldown period
5. **Lifetime Limit Enforcement**: Tracks cumulative claims per address
6. **State Validation**: Ensures contract is not paused before processing claims

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH for gas fees

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshitha1246/erc20-faucet-fullstack-dapp.git
   cd erc20-faucet-fullstack-dapp
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```
   SEPOLIA_RPC_URL=your_alchemy_or_infura_url
   PRIVATE_KEY=your_wallet_private_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   VITE_FAUCET_ADDRESS=deployed_faucet_contract_address
   VITE_TOKEN_ADDRESS=deployed_token_contract_address
   ```

3. **Run with Docker**
   ```bash
   docker-compose up
   ```
   The application will be available at `http://localhost:3000`

4. **Health Check**
   ```bash
   curl http://localhost:3000/health
   ```

## Development Setup

### Without Docker

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Start frontend development server
cd frontend
npm install
npm run dev
```

## Testing

The project includes comprehensive test coverage for the TokenFaucet contract:

```bash
npx hardhat test
```

Test suite covers:
- Contract deployment verification
- Token claim functionality
- Cooldown period enforcement
- Lifetime limit validation
- Admin pause/unpause functionality
- Error state handling

## Evaluation Interface (`window.__EVAL__`)

The frontend provides evaluation functions accessible via `window.__EVAL__` for automated testing:

```javascript
// Get connected wallet address
window.__EVAL__.getWalletAddress()

// Get current token balance
window.__EVAL__.getTokenBalance()

// Check cooldown status for wallet
window.__EVAL__.getCooldownStatus()

// Get lifetime claimed amount
window.__EVAL__.getLifetimeClaimed()

// Attempt token claim
window.__EVAL__.claimTokens()

// Get faucet status (paused/active)
window.__EVAL__.getFaucetStatus()
```

## Application Features

### Wallet Connection Interface
- Connect/disconnect MetaMask wallet
- Display connected wallet address
- Network detection and validation
- Real-time connection status

### Token Balance Display
- Current token balance in connected wallet
- Formatted balance display with proper decimals
- Auto-refresh on transaction confirmation

### Claim Functionality
- One-click token claim button
- Real-time claim eligibility checking
- Transaction confirmation feedback
- Success/error notifications

### Error States
- **Cooldown Active**: "Please wait X hours before claiming again"
- **Limit Reached**: "You have reached your lifetime claim limit"
- **Faucet Paused**: "The faucet is currently paused by the administrator"
- **Invalid Network**: "Please switch to Sepolia testnet"
- **Transaction Failed**: "Claim failed: [error details]"

### Transaction Flow
1. User connects wallet
2. Contract eligibility check (cooldown, lifetime limit, paused status)
3. Transaction submission to blockchain
4. Confirmation wait
5. Balance update display
6. Success notification with transaction hash

## Screenshots

### Wallet Connection
![Wallet Connection Interface](./screenshots/01-wallet-connection.png)
*User connecting MetaMask wallet to the dApp*

### Token Balance Display
![Token Balance](./screenshots/02-token-balance.png)
*Token balance showing in wallet*

### Successful Claim
![Successful Claim](./screenshots/03-successful-claim.png)
*Transaction confirmation after claiming tokens*

### Cooldown Error State
![Cooldown Error](./screenshots/04-cooldown-error.png)
*Error message when user attempts claim during cooldown period*

### Limit Reached Error
![Limit Error](./screenshots/05-limit-reached.png)
*Error message when lifetime limit is reached*

### Transaction Confirmation
![Transaction Confirmation](./screenshots/06-transaction-confirmation.png)
*Transaction confirmation flow with hash link*

## Video Demonstration

Comprehensive video walkthrough: [YouTube Link](https://youtube.com/watch?v=your_video_id)

Video includes:
1. **Wallet Connection** (0:00-0:30)
   - Opening MetaMask
   - Connecting to dApp
   - Network verification

2. **Initial Balance Check** (0:30-1:00)
   - Viewing current balance
   - Confirming wallet connection

3. **Token Claim** (1:00-2:00)
   - Clicking claim button
   - Approving transaction in MetaMask
   - Waiting for confirmation
   - Balance update

4. **Cooldown Period** (2:00-2:45)
   - Attempting immediate re-claim
   - Viewing cooldown error
   - Timer showing remaining cooldown

5. **Balance Updates** (2:45-3:30)
   - Demonstrating real-time balance updates
   - Transaction history display
   - Etherscan verification link

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                    │
│  ┌──────────────────────────────────────────────┐   │
│  │  Wallet Connection | Balance | Claim Button │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         │
                    ethers.js / Viem
                         │
┌─────────────────────────────────────────────────────┐
│              Blockchain (Sepolia)                     │
│  ┌──────────────┐        ┌──────────────────────┐   │
│  │ Token (ERC20)│<-------│ TokenFaucet (Logic) │   │
│  │ - Transfer   │        │ - Claim Tracking    │   │
│  │ - Approval   │        │ - Cooldown Period   │   │
│  └──────────────┘        │ - Lifetime Limits   │   │
│                          │ - Pause/Unpause     │   │
│                          └──────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Deployment on Sepolia

### Step 1: Configure Environment
```bash
cp .env.example .env
# Edit .env with Sepolia RPC URL and private key
```

### Step 2: Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 3: Verify on Etherscan
```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "constructor_arg1" "constructor_arg2"
```

### Step 4: Update Frontend
```bash
# Update .env.local in frontend directory
VITE_FAUCET_ADDRESS=0x...
VITE_TOKEN_ADDRESS=0x...
```

### Step 5: Deploy Frontend
```bash
cd frontend
npm run build
# Deploy build directory to hosting service
```

## Docker Deployment

The `docker-compose.yml` configures a complete development environment:

```yaml
services:
  frontend:
    image: node:18-alpine
    ports:
      - "3000:3000"
    environment:
      - VITE_FAUCET_ADDRESS=...
      - VITE_TOKEN_ADDRESS=...
```

### Running Locally
```bash
docker-compose up -d
```

### Health Endpoint
The application exposes a health check endpoint:
```bash
curl http://localhost:3000/health
# Expected response: HTTP 200 OK
```

## Environment Variables

See `.env.example` for all required configuration variables:

- `SEPOLIA_RPC_URL`: Alchemy or Infura RPC endpoint
- `PRIVATE_KEY`: Wallet private key for deployment
- `ETHERSCAN_API_KEY`: API key for contract verification
- `VITE_FAUCET_ADDRESS`: Deployed faucet contract address
- `VITE_TOKEN_ADDRESS`: Deployed token contract address

## Gas Optimization

The contracts implement several gas optimization techniques:

1. **Efficient Storage**: Minimized state variable usage
2. **Loop Optimization**: Avoided loops in critical paths
3. **Revert Early**: Early validation to save gas on failures
4. **Batch Operations**: Efficient cooldown and limit tracking

## Troubleshooting

### Common Issues

**Error: "Please connect wallet"**
- Solution: Click the connect wallet button and approve MetaMask connection

**Error: "Wrong network"**
- Solution: Switch to Sepolia testnet in MetaMask

**Error: "Insufficient gas"**
- Solution: Ensure wallet has Sepolia ETH for gas fees

**Cooldown not displaying correctly**
- Solution: Clear browser cache and reconnect wallet

## License

MIT License - see LICENSE file for details

## Contact

For support or questions:
- GitHub: [harshitha1246](https://github.com/harshitha1246)
- Email: contact@example.com

## Acknowledgments

- OpenZeppelin for secure contract libraries
- Hardhat for development framework
- Ethers.js for blockchain interaction
- React community for frontend frameworks
