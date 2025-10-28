import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";

function LandingPage() {
  return (
    <MainLayout>
      <div className="w-full min-h-full bg-[#F6F8FC] pb-48">
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 items-center justify-center">
          <h1 className="font-semibold">LandingPage</h1>
          <Link
            to="/all-items"
            className="bg-blue-800 font-semibold text-white border-none px-8 py-3 rounded-lg hover:bg-blue-500 cursor-pointer"
          >
            Display All Items
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default LandingPage;
