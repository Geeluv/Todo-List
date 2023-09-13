const hre = require("hardhat");

async function main() {

  const TodoContract = await hre.ethers.deployContract("TodoContract");
  console.log("Deploying contract...");
  const todoContract = await TodoContract.waitForDeployment();
  console.log(await todoContract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
