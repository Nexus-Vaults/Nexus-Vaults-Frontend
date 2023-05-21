import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";

type Props = {
  handleFeatures: (features: string[]) => void;
};

const FeaturesDashboard = ({ handleFeatures }: Props) => {
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
    {
      id: 5,
      name: "Card 5",
      description: "Description of Card 2",
      cost: 10,
      added: false,
    },
    {
      id: 6,
      name: "Card 6",
      description: "Description of Card 2",
      cost: 10,
      added: false,
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

  const addedCardIds = cards
    .filter((card) => card.added)
    .map((card) => card.name);

  useEffect(() => {
    handleFeatures(addedCardIds);
  }, [cards]);

  return (
    <div>
      <div className="flex flex-row gap-2">
        {addedCardIds.map((id) => (
          <p key={id}>ID: {id}</p>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
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
  );
};

export default FeaturesDashboard;
