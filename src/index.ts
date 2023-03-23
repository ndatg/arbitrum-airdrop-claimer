import Timer from './Timer'
import ArbitrumClaimer from './ArbitrumClaimer'
import config from './config'

async function main (): Promise<void> {
  console.log('accounts setup:')
  const arbitrumClaimer = new ArbitrumClaimer(config.arbitrumRPC)
  await arbitrumClaimer.prepare()

  console.log('\ntimer before the claim starts:')
  const timer = new Timer(config.ethereumRPC)
  await timer.tick()

  await arbitrumClaimer.start()
}

main().catch((error: Error) => {
  console.error(error.message)
  process.exitCode = 1
})
