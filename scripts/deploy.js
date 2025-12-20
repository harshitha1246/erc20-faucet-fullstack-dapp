const hre = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy Token contract
  console.log('Deploying Token contract...');
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy('Faucet Token', 'FTK', hre.ethers.parseEther('1000000'));
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log('Token deployed to:', tokenAddress);

  // Deploy TokenFaucet contract
  console.log('Deploying TokenFaucet contract...');
  const TokenFaucet = await hre.ethers.getContractFactory('TokenFaucet');
  const tokenFaucet = await TokenFaucet.deploy(
    tokenAddress,
    hre.ethers.parseEther('10'), // faucet amount
    86400, // cooldown period (24 hours)
    hre.ethers.parseEther('100') // lifetime limit
  );
  await tokenFaucet.waitForDeployment();
  const faucetAddress = await tokenFaucet.getAddress();
  console.log('TokenFaucet deployed to:', faucetAddress);

  // Transfer tokens to faucet
  console.log('Transferring tokens to faucet...');
  await token.transfer(faucetAddress, hre.ethers.parseEther('100000'));
  console.log('Transfer complete!');

  // Save deployment addresses
  console.log('\n=== Deployment Complete ===');
  console.log(`Token Address: ${tokenAddress}`);
  console.log(`TokenFaucet Address: ${faucetAddress}`);
  console.log(`\nEtherscan Links (Sepolia):`);
  console.log(`Token: https://sepolia.etherscan.io/address/${tokenAddress}`);
  console.log(`TokenFaucet: https://sepolia.etherscan.io/address/${faucetAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
