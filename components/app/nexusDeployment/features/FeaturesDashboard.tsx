import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";

type Props = {
  handleFeatures: (features: string[]) => void;
  handleBasicFeatures: (features: string[]) => void;
  handleCosts: (costs: number) => void;
};

const FeaturesDashboard = ({
  handleFeatures,
  handleBasicFeatures,
  handleCosts,
}: Props) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Card 1",
      description: "Description of Card 1",
      cost: 10,
      added: false,
    },
    {
      id: 2,
      name: "Card 2",
      description: "Description of Card 2",
      cost: 10,
      added: false,
    },
    {
      id: 3,
      name: "Card 3",
      description: "Description of Card 2",
      cost: 10,
      added: false,
    },
    {
      id: 4,
      name: "Card 4",
      description: "Description of Card 2",
      cost: 10,
      added: false,
    },

    // Add more cards here...
  ]);
  const [basicFeatures, setBasicFeatures] = useState([
    {
      id: 5,
      name: "Basic Feature 1",
      description: "Description of Card 1",
      cost: 10,
      added: true,
    },
    {
      id: 6,
      name: "Basic Feature 2",
      description: "Description of Card 2",
      cost: 10,
      added: true,
    },

    // Add more cards here...
  ]);

  const handleAddCard = (cardId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, added: true };
        }
        return card;
      })
    );
  };

  const handleRemoveCard = (cardId: number) => {
    setCards((prevCards) =>
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
        totalCost += card.cost;
      }
    });
    cards.forEach((card) => {
      if (card.added) {
        totalCost += card.cost;
      }
    });
    return totalCost;
  };

  const addedCardIds = cards
    .filter((card) => card.added)
    .map((card) => card.name);

  const addedFeaturesCardIds = basicFeatures
    .filter((card) => card.added)
    .map((card) => card.name);

  useEffect(() => {
    handleFeatures(addedCardIds);
    handleBasicFeatures(addedFeaturesCardIds);
    handleCosts(calculateTotalCost());
  }, [cards, basicFeatures, addedCardIds, addedFeaturesCardIds]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          Basic Features:
          {addedFeaturesCardIds.map((id) => (
            <p key={id}>{id}</p>
          ))}
        </div>
        <div className="flex flex-row gap-2">
          ID:
          {addedCardIds.map((id) => (
            <p key={id}> {id}</p>
          ))}
        </div>
        <div className="flex flex-row gap-2">
          Costs:
          <p>{calculateTotalCost()}</p>
        </div>
      </div>

      <div className="flex flex-row gap-5 justify-center">
        <div className="flex flex-col ">
          <div className="flex justify-center">
            <h3>Basic Features</h3>
          </div>
          <div className="flex flex-col flex-wrap justify-center gap-5">
            {basicFeatures.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                cost={card.cost}
                added={card.added}
                onAdd={handleAddBasicFeature}
                onRemove={handleRemoveBasicFeature}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          <div className="flex justify-center">
            <h3>Additional Features</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-5 ">
            {cards.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                cost={card.cost}
                added={card.added}
                onAdd={handleAddCard}
                onRemove={handleRemoveCard}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDashboard;
