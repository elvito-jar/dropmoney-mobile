import { CoinShortName } from '../types'

export default function (coin: CoinShortName) {
  switch (coin) {
    case 'BTC':
      return require('cryptocurrency-icons/32@2x/color/btc.png')

    case 'ETH':
      return require('cryptocurrency-icons/32@2x/color/eth.png')

    case 'BNB':
      return require('cryptocurrency-icons/32@2x/color/bnb.png')

    case 'BSV':
      return require('cryptocurrency-icons/32@2x/color/bsv.png')

    case 'BCH':
      return require('cryptocurrency-icons/32@2x/color/bch.png')

    case '$':
      return require('cryptocurrency-icons/32@2x/color/btc.png')

    case 'BsS':
      return require('cryptocurrency-icons/32@2x/color/btc.png')

    default:
      return require('cryptocurrency-icons/32@2x/color/btc.png')
  }
}
