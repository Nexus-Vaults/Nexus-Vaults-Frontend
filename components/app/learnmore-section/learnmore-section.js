import Image from 'next/image';

const Learnmore = () => {
  return (
    <>
      <div className="flex flex-col items-center py-4">
        <h2 className="bg-header">Empower your crypto today</h2>
        <Image
          src="/../../styles/global.css"
          width="550"
          height="645"
          alt="Extendable. Flexible. Modular."
        />
        <div className="flex items-center grow px-8 infobox">
          <h3 className="infobox-gradient">How it works</h3>
          {/* <hr className="underline"></hr> */}
          <p className="">
            Utilizing a network of smart contracts, Axelar Network and a team of buidlers -
            Nexus Vaults provides secure and efficent payment managment system.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 justify-center justify-items-center gap-8 p-4">
        <div className="blob">

        </div>
        <div className="blob">
            <p><span>1</span> point of access for your crypto treasury</p>
        </div>
        <div className="blob">

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
