import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../../../../_app';
import Layout from '../../../../../../components/layout';
import { ChainDeployments } from '../../../../../../components/Context';
import { Feature, apiClient } from 'api';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useRouter } from 'next/router';
import LoadingAnimation from '../../../../../../components/app/utils/LoadingAnimation';
import { Nexus } from 'abiTypes/contracts/nexus/Nexus.sol/Nexus';

type Props = {};

type FeatureCardPropos = {
  nexusAddress: Address;
  feature: Feature;
  installed: boolean;
};
const FeatureCard = ({
  nexusAddress,
  feature,
  installed,
}: FeatureCardPropos) => {
  const installWriteConfig = usePrepareContractWrite({
    abi: Nexus,
    address: nexusAddress,
    functionName: 'installFacetFromCatalog',
    args: [
      feature.catalogAddress,
      feature.address,
      {
        token: feature.feeTokenAddress,
        amount: BigInt(feature.feeTokenAmount),
      },
    ],
    enabled: !installed,
  });

  const { writeAsync: installFacetAsync } = useContractWrite(
    installWriteConfig.config
  );

  return (
    <li className="flex flex-col border border-black rounded-md p-3">
      <div className="flex flex-row h-6 justify-between items-center">
        <h3 className="text-lg font-bold">{feature.name}</h3>
        {installed && <img className="h-[130%]" src="/images/tick.svg"></img>}
      </div>
      <hr className="border border-black my-2" />
      <p>{feature.description}</p>

      {!installed && installFacetAsync != null && (
        <div className="flex justify-end mt-auto pt-2">
          <button
            onClick={installFacetAsync}
            className="bg-blue-400 px-3 py-1 rounded-md"
          >
            Install
          </button>
        </div>
      )}
    </li>
  );
};

const NexusExtensions: NextPageWithLayout = (props: Props) => {
  const [availableFeatures, setAvailableFeatures] = useState<Feature[] | null>(
    null
  );
  const [hasLouper, setHasLouper] = useState<boolean | null>(null);
  const [installedFeatures, setInstalledFeatures] = useState<Feature[] | null>(
    null
  );

  const router = useRouter();
  const { contractChainId: contractChainIdRaw, nexusAddress: nexusAddressRaw } =
    router.query;
  const deployment = useContext(ChainDeployments);

  const contractChainId = contractChainIdRaw?.valueOf() as number;
  const nexusAddress = nexusAddressRaw as Address;

  useEffect(() => {
    if (contractChainId == null) {
      return;
    }

    const currentDeployment = deployment.chainDeployment.find(
      (x) => x.contractChainId == contractChainId
    )!;

    Promise.all([
      apiClient.getFeatures(
        contractChainId,
        currentDeployment.publicCatalogAddress
      ),
      apiClient.getNexusOverview(contractChainId, nexusAddress),
    ]).then(([features, nexus]) => {
      setHasLouper(nexus.hasLoupeFacet);

      if (nexus.hasLoupeFacet) {
        setInstalledFeatures(
          features.filter((f) => nexus.facetAddresses.includes(f.address))
        );
        setAvailableFeatures(
          features.filter((f) => !nexus.facetAddresses.includes(f.address))
        );
      } else {
        setAvailableFeatures(features);
      }
    });
  }, [contractChainId]);

  return (
    <div className="w-[80%] mt-6 grid grid-cols-1 auto-rows-max gap-2">
      <h1 className="font-bold text-4xl mb-2">Extension Store</h1>
      {availableFeatures == null && (
        <div className="flex flex-col items-center">
          <div className="w-3/5 md:w-1/3 xl:w-1/6">
            <LoadingAnimation></LoadingAnimation>
          </div>
        </div>
      )}
      {availableFeatures != null && (
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">Installed</h2>
            <hr className="border-black border-2" />
            {hasLouper == false && (
              <p className="text-red-500 text-bold">Missing Loupe Extension</p>
            )}
            {hasLouper && (
              <ul className="grid grid-cols-2 gap-3 my-4">
                {installedFeatures?.map((feature) => (
                  <FeatureCard
                    key={feature.address}
                    nexusAddress={nexusAddress}
                    feature={feature}
                    installed={true}
                  ></FeatureCard>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">Available Extensions</h2>
            <hr className="border-black border-2" />

            <ul className="grid grid-cols-2 gap-3 my-4">
              {availableFeatures?.map((feature) => (
                <FeatureCard
                  key={feature.address}
                  nexusAddress={nexusAddress}
                  feature={feature}
                  installed={false}
                ></FeatureCard>
              ))}
              {availableFeatures.length == 0 && <p>You are all set!</p>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

NexusExtensions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NexusExtensions;
