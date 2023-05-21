import React from "react";

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
    <div className="border p-4 rounded hover:bg-black">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>
      {added ? (
        <button onClick={() => onRemove(id)}>Remove</button>
      ) : (
        <button onClick={() => onAdd(id)}>Add</button>
      )}
    </div>
  );
};

export default FeatureCard;
