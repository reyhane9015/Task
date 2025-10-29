import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";

function LandingPage() {
  return (
    <MainLayout>
      <div className="w-full min-h-full bg-[#F6F8FC]">
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 items-center justify-center">
          <h1 className="font-semibold text-lg">LandingPage</h1>
          <Link to="/all-items" className="btn-secondary">
            Display All Items
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default LandingPage;
