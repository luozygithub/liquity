// Truffle migration script for deployment to Ganache

const SortedTroves = artifacts.require("./SortedTroves.sol")
const ActivePool = artifacts.require("./ActivePool.sol")
const DefaultPool = artifacts.require("./DefaultPool.sol")
const StabilityPool = artifacts.require("./StabilityPool.sol")
const TroveManager = artifacts.require("./TroveManager.sol")
const PriceFeed = artifacts.require("./PriceFeed.sol")
const LUSDToken = artifacts.require("./LUSDToken.sol")
const FunctionCaller = artifacts.require("./FunctionCaller.sol")
const BorrowerOperations = artifacts.require("./BorrowerOperations.sol")

const deploymentHelpers = require("../utils/truffleDeploymentHelpers.js")

const getAddresses = deploymentHelpers.getAddresses
const connectContracts = deploymentHelpers.connectContracts

module.exports = function(deployer) {
  deployer.deploy(BorrowerOperations).then((borrowerOperations)=>{
    deployer.deploy(TroveManager).then((troveManager)=>{
      deployer.deploy(StabilityPool).then((stabilityPool)=>{
        console.log("troveManager");
        console.log(  troveManager.address);
        console.log("stabilityPool");
        console.log( stabilityPool.address);
        console.log( "borrowerOperations");
        console.log(borrowerOperations.address);
        deployer.deploy(LUSDToken,troveManager.address,
          stabilityPool.address,
          borrowerOperations.address)

      })

    })
  })
  deployer.deploy(PriceFeed)
  deployer.deploy(SortedTroves)
  deployer.deploy(ActivePool)
  deployer.deploy(DefaultPool)
  deployer.deploy(FunctionCaller)

  deployer.then(async () => {
    const borrowerOperations = await BorrowerOperations.deployed()
    const priceFeed = await PriceFeed.deployed()
    const sortedTroves = await SortedTroves.deployed()
    const troveManager = await TroveManager.deployed()
    const activePool = await ActivePool.deployed()
    const stabilityPool = await StabilityPool.deployed()
    const defaultPool = await DefaultPool.deployed()
    console.log("troveManager");
    console.log(  troveManager.address)
    console.log( stabilityPool.address);
    console.log(    borrowerOperations.address);
    const lusdToken = await LUSDToken.new(
      troveManager.address,
      stabilityPool.address,
      borrowerOperations.address
    )
    const functionCaller = await FunctionCaller.deployed()
    console.log("functionCaller is deployed");
    const liquityContracts = {
      borrowerOperations,
      priceFeedTestnet:priceFeed,
      lusdToken,
      sortedTroves,
      troveManager,
      activePool,
      stabilityPool,
      defaultPool,
      functionCaller
    }

    // Grab contract addresses
    const liquityAddresses = getAddresses(liquityContracts)
    console.log('deploy_contracts.js - Deployed contract addresses: \n')
    console.log(liquityAddresses)
    console.log('\n')

    // Connect contracts to each other
    console.log("    // Connect contracts to each other");
    await connectContracts(liquityContracts, liquityAddresses)
  })
}
