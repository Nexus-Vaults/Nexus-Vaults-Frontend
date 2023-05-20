import React from "react";

type Props = {};

const FeaturesDashboard = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border border-white p-4 rounded text-white hover:bg-white hover:text-background">
        <h2 className="text-xl font-bold">Card 1</h2>
        <p>Description of Card 1</p>
        <p>Cost: $10</p>
      </div>
      <div className="border border-white p-4 rounded text-white hover:bg-white hover:text-background">
        <h2 className="text-xl font-bold">Card 2</h2>
        <p>Description of Card 2</p>
        <p>Cost: $15</p>
      </div>
      <div className="border border-white p-4 rounded text-white hover:bg-white hover:text-background">
        <h2 className="text-xl font-bold">Card 3</h2>
        <p>Description of Card 3</p>
        <p>Cost: $20</p>
      </div>
      <div className="border border-white p-4 rounded text-white hover:bg-white hover:text-background">
        <h2 className="text-xl font-bold">Card 4</h2>
        <p>Description of Card 4</p>
        <p>Cost: $25</p>
      </div>
      <div className="border border-white p-4 rounded text-white hover:bg-white hover:text-background">
        <h2 className="text-xl font-bold">Card 5</h2>
        <p>Description of Card 5</p>
        <p>Cost: $30</p>
      </div>
      <div className="border border-white p-4 rounded text-white hover:bg-white hover:text-background">
        <h2 className="text-xl font-bold">Card 6</h2>
        <p>Description of Card 6</p>
        <p>Cost: $35</p>
      </div>
    </div>
  );
};

export default FeaturesDashboard;
