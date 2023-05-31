import Learnmore from '../components/app/learnmore-section/learnmore-section';
import Footer from '../components/app/footer/footer';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-primary-gradient">
      <div className="bg-img">
        <div className="flex flex-col items-center py-12">
          <div className="main-font">
            <h1 className="tracking-primary text-center">NEXUS</h1>
            <h1 className="tracking-secondary text-center">VAULTS</h1>
          </div>

          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            onClick={() => router.push('/app')}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Enter Nexus
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            onClick={() => router.push('/app')}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Learn more
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center py-4">
        <h2 className="bg-header font-extrabold tracking-wide">
          Empower your crypto treasury
        </h2>
        <Image
          className="py-8"
          src="/../public/images/crosswordPNG.png"
          width="281"
          height="464"
          alt="Extendable. Flexible. Modular. Secure."
        />
        <div className="flex flex-col items-center grow px-40 py-8 infobox rounded-3xl w-2/3 bg-whitesmoke">
          <h3 className="infobox-gradient text-rose font-bold tracking-wider">
            How it works
          </h3>
          <hr className="underline w-2/3 h-1.5"></hr>
          <p className="py-4 tracking-wide text-center text-rose">
            With Nexus Vaults, you can leverage the power of Axelar Network to
            seamlessly transfer and manage your crypto assets across different
            chains using a new Web3 standard of cross chain messaging.
          </p>
        </div>
      </div>
      <Learnmore></Learnmore>
      <Footer></Footer>
    </div>
  );
}
