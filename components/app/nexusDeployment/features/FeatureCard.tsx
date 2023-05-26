import React from 'react';

type CardProps = {
  id: number;
  name: string;
  description: string;
  cost: number;
  added: boolean;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

const FeatureCard = ({
  id,
  name,
  description,
  cost,
  added,
  onAdd,
  onRemove,
}: CardProps) => {
  return (
    <div
      className={`border p-4 rounded hover:bg-gray-100 cursor-pointer ${
        added ? 'bg-gray-100' : ''
      }`}
      onClick={added ? () => onRemove(id) : () => onAdd(id)}
    >
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>
    </div>
  );
};

export default FeatureCard;
