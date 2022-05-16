import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
  [ChainId.CLOVER_PARACHAIN]: new Token(ChainId.CLOVER_PARACHAIN, '0x6d6AD95425FcF315c39Fa6F3226471d4f16F27B3', 18, 'WCLV', 'Wrapped CLV'),
  [ChainId.MOON_MAINNET]: new Token(ChainId.MOON_MAINNET, '0x98878B06940aE243284CA214f92Bb71a2b032B8A', 18, 'WMOVR', 'Wrapped MOVR'),
  [ChainId.MOON_TESTNET]: new Token(ChainId.MOON_TESTNET, '0x372d0695E75563D9180F8CE31c9924D7e8aaac47', 18, 'WDEV', 'Wrapped MDEV')
}
