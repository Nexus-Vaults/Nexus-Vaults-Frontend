import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/app/navbar/navbar";
import Sidebar from "../../components/app/sidebar";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar></Navbar>
      <div className="flex-1 flex flex-row">
        <Sidebar></Sidebar>

        <div className="flex-1 flex flex-row  p-2 gap-2 ">
          <div className=" flex flex-col flex-1 ">
            <div className="flex flex-col justify-start align-center p-20">
              <h2 className="font-normal font-normal text-4xl leading-12 text-center ">
                Welcome to Nexus Vaults
              </h2>
              <p className="text-center ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Pellentesque ut augue libero.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                ut augue libero.
              </p>
            </div>
            <div className="flex flex-row    gap-x-12 justify-center">
              <div
                className="flex flex-col bg-red p-4  rounded-[100px]  justify-center align-center   hover:text-background hover:bg-gray-700"
                onClick={() => router.push("/deploy-nexus")}
              >
                <h1 className="text-center  text-gray-100 ">Deploy Nexus</h1>
              </div>
              <div
                className="flex flex-col bg-red p-4  rounded-[100px]  justify-center align-center hover:text-background  hover:bg-gray-700"
                onClick={() => router.push("/app")}
              >
                <h1 className="text-center text-gray-100">Access Nexus</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
