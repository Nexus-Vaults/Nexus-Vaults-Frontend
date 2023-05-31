import SavingsIcon from '@mui/icons-material/Savings';

const Learnmore = () => {
  return (
    <>
      <div className="grid grid-cols-3 justify-center justify-items-center gap-8 px-4 py-20 text-white">
      <h2 className="bg-header text-center col-span-3">Features</h2>
        <div className="grid-col-1 bg-rose w-1/3 rounded-md text-center pt-2">
          <SavingsIcon/>
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
    </>
  );
};

export default Learnmore;