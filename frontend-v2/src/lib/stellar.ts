const CONTRACT_ADDRESSES = {
  token: process.env.NEXT_PUBLIC_STELLAR_TOKEN_CONTRACT_ID,
  payment: process.env.NEXT_PUBLIC_STELLAR_PAYMENT_CONTRACT_ID,
};

export function validateContractAddresses() {
  const missing = Object.entries(CONTRACT_ADDRESSES)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing contract addresses: ${missing.join(', ')}`);
  }
  if (missing.length > 0) {
    console.warn(`[Stellar] Missing contract addresses: ${missing.join(', ')}`);
  }
}