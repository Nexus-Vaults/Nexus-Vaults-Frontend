import { TokenInfoDTO } from 'api';
import React, { useContext, useState } from 'react';
import { getEvmChainId, mapEVMChainIdToChain } from '../../../utils';
import { ChainDeployments } from '../../ContractsAddressesContext';
import SendPaymentModal from '../modals/SendPaymentModal';
import { Address } from 'wagmi';

interface Props {
  nexusContractChainId: number;
  nexusAddress: Address;
  assetContractChainId: number;
  asset: TokenInfoDTO;
  balance: number;
}

const AssetRow = ({
  nexusContractChainId,
  nexusAddress,
  assetContractChainId,
  asset,
  balance,
}: Props) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  const deployment = useContext(ChainDeployments);

  const assetDetails =
    asset.tokenType == 1
      ? mapEVMChainIdToChain(
          getEvmChainId(deployment.chainDeployment, assetContractChainId)
        ).nativeCurrency
      : null;

  function bigIntToDecimalAdjustedString(value: number, decimals: number) {
    const divider = Math.ceil(Math.pow(10, decimals)) / 1000;
    const adjusted = Number(value / divider);

    return adjusted / 1000;
  }

  const decimals = assetDetails?.decimals ?? 0;
  const balance_string = bigIntToDecimalAdjustedString(balance, decimals);

  return (
    <>
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        <img
          src={`/images/chain/${getEvmChainId(
            deployment.chainDeployment,
            assetContractChainId
          )}.png`}
          width={64}
        />
      </td>
      <td>{asset.tokenType == 1 ? assetDetails?.symbol : 'Other'}</td>
      <td>{balance_string}</td>
      <td>
        <button
          disabled={balance == 0}
          className={
            (balance > 0 ? 'bg-purple hover:bg-purple' : 'bg-gray-500') +
            ' text-white font-bold py-1 px-2 rounded-lg'
          }
          onClick={() => setPaymentModalOpen(true)}
        >
          Send
        </button>
      </td>
      {paymentModalOpen && (
        <SendPaymentModal
          nexusContractChainId={nexusContractChainId}
          assetContractChainId={assetContractChainId}
          nexusAddress={nexusAddress}
          tokenInfo={asset}
          onClose={() => setPaymentModalOpen(false)}
        ></SendPaymentModal>
      )}
    </>
  );
};

export default AssetRow;
