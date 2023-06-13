import React, { useEffect, useState } from 'react';
import Table, { AssetBalance } from '../table';
import CardsOverview from './cards-overview';
import Graph from './graph/graph';
import { apiClient, Nexus, SubChain, VaultInfo } from 'api';

type Props = {
  contractChainId: number;
  address: `0x${string}`;
};

const Overview = ({ address, contractChainId }: Props) => {
  const [nexus, setNexus] = useState<Nexus>();

  useEffect(() => {
    apiClient.getNexusOverview(contractChainId, address).then((nexus) => {
      setNexus(nexus);
    });
  }, []);

  return (
    <>
      {nexus && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
          <CardsOverview
            address={address}
            contractChainId={contractChainId}
            nexusName={nexus?.name}
            nexusId={nexus?.nexusId}
            owner={nexus?.owner}
            subChains={nexus?.subchains}
          />
          <div className="w-full h-full flex-1 border-2 border-gray-400 bg-white shadow-lg rounded-lg">
            <h1 className="text-center text-gray-500 text-lg font-medium  font-sans">
              Timeline Chart
            </h1>
            <Graph></Graph>
          </div>
          <div className="w-full flex-1 ">
            <Table
              nexusContractChainId={contractChainId}
              nexusAddress={address}
              data={nexus.subchains.reduce(
                (x, y) =>
                  x.concat(
                    y.balances.map((tokenBalance) => {
                      return {
                        assetContractChainId: y.contractChainId,
                        balance: tokenBalance.balance,
                        token: tokenBalance.token,
                      };
                    })
                  ),
                [] as AssetBalance[]
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
