import { JsonRpcProvider, Transaction, Wallet } from 'ethers'
import config from './config'

interface SignedTransaction {
  address: string
  signedTransaction: string
}

class ArbitrumClaimer {
  private readonly arbitrumProvider: JsonRpcProvider
  private readonly signedClaimTransactions: SignedTransaction[]

  constructor (arbitrumRPC: string) {
    this.arbitrumProvider = new JsonRpcProvider(arbitrumRPC)
    this.signedClaimTransactions = []
  }

  async prepare (): Promise<void> {
    for (const privateKey of config.privateKeys) {
      const account = new Wallet(privateKey)
      const address = await account.getAddress()
      const nonce = await this.arbitrumProvider.getTransactionCount(address)

      const transaction = new Transaction()
      transaction.to = config.distributorAddress
      transaction.chainId = config.chainId
      transaction.gasLimit = config.gasLimit
      transaction.gasPrice = config.gasPrice
      transaction.maxFeePerGas = config.maxFeePerGas
      transaction.maxPriorityFeePerGas = config.maxPriorityFeePerGas
      transaction.nonce = nonce
      transaction.data = config.data

      const signedTransaction = await account.signTransaction(transaction)
      this.signedClaimTransactions.push({
        address,
        signedTransaction
      })

      console.log(`[${address}] transaction prepared`)
    }
    console.log('all accounts prepared')
  }

  async start (): Promise<void> {
    console.log('start claim:')
    this.signedClaimTransactions.forEach((transaction: SignedTransaction) => {
      void this.arbitrumProvider.send(
        'eth_sendRawTransaction',
        [transaction.signedTransaction]
      ).then((transactionHash: string) => {
        console.log(`[${transaction.address}][claim] https://arbiscan.io/tx/${transactionHash}`)
      })
    })
  }
}

export default ArbitrumClaimer
