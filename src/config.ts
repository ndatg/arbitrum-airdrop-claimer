import { getAddress, parseUnits } from 'ethers'

export default {
  ethereumRPC: 'https://eth-mainnet.public.blastapi.io',
  arbitrumRPC: 'https://arbitrum-one.public.blastapi.io',
  startBlockNumber: 16890400,

  distributorAddress: getAddress('0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9'),
  chainId: 42161,
  gasLimit: 1000000,
  gasPrice: parseUnits('1', 'gwei'),
  maxFeePerGas: parseUnits('20', 'gwei'),
  maxPriorityFeePerGas: parseUnits('5', 'gwei'),
  data: '0x4e71d92d',

  privateKeys: [
    '0x...'
  ]
}
