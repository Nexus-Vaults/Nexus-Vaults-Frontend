import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/app/navbar/navbar";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar></Navbar>
      </div>

      <div className="flex-1 flex flex-row bg-background p-2 gap-2">
        <div className="flex flex-col  w-[20%] border-solid border-2	 rounded-md">
          <h1 className="flex-1 text-center ">My Nexuses</h1>
          <h1 className="flex-1 text-center ">My Vaults</h1>
        </div>
        <div className=" flex flex-col flex-1 ">
          <div className="flex flex-col justify-start align-center p-20">
            <h2 className="font-normal font-normal text-4xl leading-12 text-center ">
              Welcome to Nexus Vaults
            </h2>
            <p className="text-center ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Pellentesque ut augue libero.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut
              augue libero.
            </p>
          </div>
          <div className="flex flex-row gap-6 h-[200px] px-20 py-5 gap-x-12 justify-center">
            <div
              className="flex flex-col w-[30%] border-solid  border-2  rounded-md  justify-center align-center  hover:text-background"
              onClick={() => router.push("/deploy-nexus")}
            >
              <h1 className="text-center  ">Deploy Nexus</h1>
            </div>
            <div
              className="flex flex-col w-[30%] border-solid border-2  rounded-md justify-center align-center hover:text-background"
              onClick={() => router.push("/app")}
            >
              <h1 className="text-center">Access Existing Nexus</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
