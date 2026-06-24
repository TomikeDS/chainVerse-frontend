'use client';

import { useWallet } from '@/src/context/WalletContext';

export function ConnectWalletButton() {
  const { isConnected, publicKey, connect, disconnect } = useWallet();

  if (isConnected && publicKey) {
    return (
      <button
        onClick={disconnect}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
    >
      Connect Wallet
    </button>
  );
}
