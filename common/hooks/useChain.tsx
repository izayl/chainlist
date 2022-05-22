import { useToasts } from '@geist-ui/react'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import { EVM_BOX_PERSIST } from '../constants'
import { updateNetworkRecord } from '../services'
import { useDApp } from './useDApp'

const { hexValue } = utils

export const useChain = (): [number | undefined, (chain: Chain) => void] => {
  const enable = useDApp()
  const [, setToast] = useToasts()
  const [currentChainId, setCurrentChainId] = useState<Chain['chainId']>()

  useEffect(() => {
    if (enable && window.ethereum) {
      setCurrentChainId(Number(window.ethereum.chainId))
    }
  })

  const switchEthChain = (chain: Chain) => {
    if (!enable) return

    const params: AddEthereumChainParameter = {
      chainId: hexValue(chain.chainId),
      blockExplorerUrls: chain.explorers?.length
        ? [chain.explorers[0].url]
        : [chain.infoURL],
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol,
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpc,
    }

    try {
      updateNetworkRecord(chain.chainId)
    } catch (error) {
      //
    }
    window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexValue(chain.chainId) }],
      })
      .then(
        () => {
          setToast({ text: 'network switched success!' })
        },
        (error: Error & { code?: string | number }) => {
          if (Number(error.code) === 4001) {
            // ignore user cancel
            return
          }
          window.ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [params],
            })
            .then(() => {
              setToast({
                text: 'add network successfully!',
              })
              const prev = window.localStorage.getItem(EVM_BOX_PERSIST)
              const persist = [chain.chainId, prev].filter(Boolean).join(',')
              window.localStorage.setItem(EVM_BOX_PERSIST, persist)
            })
            .catch((e: Error) => {
              setToast({
                text: 'add network failed: ' + e.message,
              })
            })
        },
      )
  }

  return [currentChainId, switchEthChain]
}
