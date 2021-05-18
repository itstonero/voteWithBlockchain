# Presidential Election 
 - Powered by Ethereum Smart-Contract

# Environment Setup
 - To setup the smart contract on your local machine. Kindly follow the prescribed steps/process
## Smart Contract
 - clone smart-contract branch by running 
 - `git clone --single-branch --branch smartContract https://github.com/itstonero/voteWithBlockchain.git smart_contract`
 - cd smart_contract
### Ganache
 - Download from `https://www.trufflesuite.com/ganache`
 - Install 
 - Run
 - Copy RPC SERVER `e.g HTTP://127.0.0.1:7545`
### Truffle Suite
 - Run `npm install --global truffle` from `smart_contract` folder
### MetaMask
 - Download MetaMask Extension
 - Install 
 - Configure GANACHE on Metamask with RPC configuration
 - Add Account(s) from GANACHE network to Metamask
### NPM Initialization
 - Run `npm install` from `smart_contract` to install all dependencies
### Truffle Deployment
 - Run `truffle compile` from `smart_contract` folder
 - Run `truffle migrate` or `truffle migrate --reset` to deploy
 - Run `truffle test` to validate test cases

### Copy ABI and Smart Contract Address
 - Open `smart_contract\build\contracts\Electioneering.json`
 - Copy `abi`
 - Copy `address` from `networks`
 #### Congratulations Smart Contract has been successfully deployed to GANACHE

## React Frontend
 - clone smart-contract branch by running 
 - `git clone --single-branch --branch reactFrontend https://github.com/itstonero/voteWithBlockchain.git react_frontend`
 - cd react_frontend

 ### NPM Initialization
 - Run `npm install` to install all dependencies
 - Open `react_frontend\src\config\electionContract.json`
 - Paste `abi` from `smart_contract` to `ABI`
 - Paste `address` from `smart_contract` to `ADDRESS`

### Start Application
 - Run `npm start` to start application

#### Congratulations!!
#### Happy Voting.... Hurrays!!!



