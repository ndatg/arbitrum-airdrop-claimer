import { JsonRpcProvider } from 'ethers'
import config from './config'

class Timer {
  private readonly ethereumProvider: JsonRpcProvider

  constructor (ethereumRPC: string) {
    this.ethereumProvider = new JsonRpcProvider(ethereumRPC)
  }

  async tick (): Promise<void> {
    let blockNumber = 0
    do {
      blockNumber = await this.ethereumProvider.getBlockNumber()
      process.stdout.write(`\rcurrent block number: ${blockNumber}`)
    } while (blockNumber < config.startBlockNumber)
    console.log()
  }
}

export default Timer
