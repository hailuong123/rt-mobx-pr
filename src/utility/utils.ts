import { fromWei, getTxFee } from './web3.util.min';

export const getFee = (gasUsed: number) => {
  const fee = getTxFee(gasUsed);
  return `${fromWei(fee, undefined, 'ether')} Ether`; 
};

export const formatNumber = (value: number) => {
  return value.toLocaleString(undefined, {maximumFractionDigits: 20});
};
