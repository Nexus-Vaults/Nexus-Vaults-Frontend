import React, { useEffect, useState } from 'react';
import FeatureCard from './FeatureCard';
import { Feature } from 'api';

type Props = {
  handleFeatures: (features: Feature[]) => void;
  handleBasicFeatures: (features: Feature[]) => void;
  handleCosts: (costs: number) => void;
  features: Feature[];
};

const FeaturesDashboard = ({
  handleFeatures,
  handleBasicFeatures,
  handleCosts,
  features,
}: Props) => {
  const basic = features
    .filter((x) => x.isBasic)
    .map((x, index) => ({ ...x, added: false, id: index + 1 }));

  const other = features
    .filter((x) => !x.isBasic)
    .map((x, index) => ({ ...x, added: false, id: index + 1 }));
  const [otherFeatures, setOtherFeatures] = useState(other);
  const [basicFeatures, setBasicFeatures] = useState(basic);

  const handleAddCard = (cardId: number) => {
    setOtherFeatures((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, added: true };
        }
        return card;
      })
    );
  };

  const handleRemoveCard = (cardId: number) => {
    setOtherFeatures((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, added: false };
        }
        return card;
      })
    );
  };

  const handleAddBasicFeature = (cardId: number) => {
    setBasicFeatures((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, added: true };
        }
        return card;
      })
    );
  };

  const handleRemoveBasicFeature = (cardId: number) => {
    setBasicFeatures((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, added: false };
        }
        return card;
      })
    );
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    basicFeatures.forEach((card) => {
      if (card.added) {
        totalCost += card.feeTokenAmount;
      }
    });
    otherFeatures.forEach((card) => {
      if (card.added) {
        totalCost += card.feeTokenAmount;
      }
    });
    return totalCost;
  };

  const addedCardIds = otherFeatures.filter((card) => card.added);
  const addedFeaturesCardIds = basicFeatures.filter((card) => card.added);

  useEffect(() => {
    handleFeatures(addedCardIds);
    handleBasicFeatures(addedFeaturesCardIds);
    handleCosts(calculateTotalCost());
  }, [otherFeatures, basicFeatures]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row gap-5 justify-center">
        <div className="flex flex-col ">
          <div className=" flex justify-center font-mono font-semibold">
            <h3>Basic Features</h3>
          </div>
          <div className="flex flex-col flex-wrap justify-center gap-5">
            {basicFeatures.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                feeTokenSymbol={card.feeTokenSymbol}
                feeTokenAmount={card.feeTokenAmount}
                added={card.added}
                onAdd={handleAddBasicFeature}
                onRemove={handleRemoveBasicFeature}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          <div className="flex justify-center font-mono font-semibold">
            <h3>Additional Features</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-5 ">
            {otherFeatures.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                feeTokenSymbol={card.feeTokenSymbol}
                feeTokenAmount={card.feeTokenAmount}
                added={card.added}
                onAdd={handleAddCard}
                onRemove={handleRemoveCard}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="font-mono font-semibold flex flex-col gap-2 justify-center items-center border-gray-400">
        Costs:
        <p>{calculateTotalCost()}</p>
      </div>
    </div>
  );
};

export default FeaturesDashboard;
