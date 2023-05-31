import Image from 'next/image';

const Learnmore = () => {
  return (
    <>
      <div className="grid grid-cols-3 justify-center justify-items-center gap-8 p-4">
        <div className="blob grid-col-1 bg-rose w-1/3 rounded-md text-center">
          Blob 1
        </div>
        <div className="blob grid-col-1 bg-rose w-1/3 rounded-md text-center">
          <p>
            <span>1</span>
            point of access for your crypto treasury
          </p>
        </div>
        <div className="blob grid-col-1 bg-rose w-1/3 rounded-md text-center">
          Blob 3
        </div>
      </div>
      {/* <div className="grid justify-items-center grid-cols-2 grid-rows-2 gap-4 p-4">
        <div className="card bg-earthyellow row-span-2">
          <span className="card-title">Title</span>
          <p>Lorem Ipsum dolores sin amet te tjerat i di vet ti</p>
        </div>
        <div className="card bg-nexussecondary hover:bg-[#C6BB8B]">
          <span className="card-title">Title</span>
          <p>Lorem Ipsum dolores sin amet te tjerat i di vet</p>
        </div>
        <div className="card bg-nexussecondary hover:bg-[#C6BB8B]">
          <span className="card-title">Title</span>
          <p>Lorem Ipsum dolores sin amet te tjerat i di vet</p>
        </div>
      </div> */}
    </>
  );
};

export default Learnmore;
