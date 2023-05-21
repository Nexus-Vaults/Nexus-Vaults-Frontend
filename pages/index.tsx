import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Learnmore from "../components/app/learnmore-section/learnmore-section.js";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gray-800 bg-img">
      <Navbar></Navbar>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <div className="flex items-center justify-center py-80">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            onClick={() => router.push("/app")}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Enter Nexus
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            onClick={() => router.push("/app")}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Learn more
            </span>
          </button>
        </div>
      </Layout>
      <Learnmore></Learnmore>
    </div>
  );
}
