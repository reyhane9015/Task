import React from "react";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-4">{children}</div>
    </div>
  );
}

export default MainLayout;
