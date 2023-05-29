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
      className={`font-mono border p-4 rounded-lg hover:bg-[#0e76fd] hover:text-white cursor-pointer ${
        added ? 'bg-[#0e76fd] text-white' : ''
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
