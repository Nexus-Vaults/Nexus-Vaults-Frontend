import Image from 'next/image';

const Learnmore = () => {
  return (
    <>
      <div className="grid grid-cols-3 justify-center justify-items-center gap-8 p-4  text-white">
        <div className="grid-col-1 bg-rose w-1/3 rounded-md text-center pt-2">
          Blob 1
        </div>
        <div className="grid grid-col-1 grid-rows-2 bg-rose w-1/3 rounded-md text-center pt-2">
            <span className="grid-row-1">1</span>
            <p className="">
            point of access for your crypto treasury
            </p>
        </div>
        <div className="grid-col-1 bg-rose w-1/3 rounded-md text-center pt-2">
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
