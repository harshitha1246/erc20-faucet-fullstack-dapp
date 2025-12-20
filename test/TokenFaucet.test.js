const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenFaucet Contract', function () {
  let tokenFaucet, token, owner, user1, user2;
  const FAUCET_AMOUNT = ethers.parseEther('10');
  const LIFETIME_LIMIT = ethers.parseEther('100');
  const COOLDOWN_PERIOD = 86400; // 24 hours

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy Token contract
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy('Faucet Token', 'FTK', ethers.parseEther('1000000'));

    // Deploy TokenFaucet contract
    const TokenFaucet = await ethers.getContractFactory('TokenFaucet');
    tokenFaucet = await TokenFaucet.deploy(await token.getAddress(), FAUCET_AMOUNT, COOLDOWN_PERIOD, LIFETIME_LIMIT);

    // Transfer tokens to faucet
    await token.transfer(await tokenFaucet.getAddress(), ethers.parseEther('100000'));
  });

  describe('Deployment', function () {
    it('Should have correct token address', async function () {
      expect(await tokenFaucet.token()).to.equal(await token.getAddress());
    });

    it('Should have correct faucet amount', async function () {
      expect(await tokenFaucet.faucetAmount()).to.equal(FAUCET_AMOUNT);
    });
  });

  describe('Claims', function () {
    it('Should allow user to claim tokens', async function () {
      const beforeBalance = await token.balanceOf(user1.address);
      await tokenFaucet.connect(user1).claimTokens();
      const afterBalance = await token.balanceOf(user1.address);
      expect(afterBalance - beforeBalance).to.equal(FAUCET_AMOUNT);
    });

    it('Should enforce cooldown period', async function () {
      await tokenFaucet.connect(user1).claimTokens();
      await expect(tokenFaucet.connect(user1).claimTokens()).to.be.revertedWith('Cooldown period not elapsed');
    });

    it('Should enforce lifetime limit', async function () {
      let claimsNeeded = (LIFETIME_LIMIT / FAUCET_AMOUNT) + 1n;
      for (let i = 0; i < Number(claimsNeeded) - 1; i++) {
        await tokenFaucet.connect(user1).claimTokens();
        await ethers.provider.send('evm_increaseTime', [COOLDOWN_PERIOD + 1]);
      }
      await expect(tokenFaucet.connect(user1).claimTokens()).to.be.revertedWith('Lifetime limit exceeded');
    });
  });

  describe('Admin Functions', function () {
    it('Should allow owner to pause faucet', async function () {
      await tokenFaucet.connect(owner).pauseFaucet();
      expect(await tokenFaucet.paused()).to.be.true;
    });

    it('Should prevent claims when paused', async function () {
      await tokenFaucet.connect(owner).pauseFaucet();
      await expect(tokenFaucet.connect(user1).claimTokens()).to.be.revertedWith('Faucet is paused');
    });
  });
});
