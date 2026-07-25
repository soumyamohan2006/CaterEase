import { Outlet } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 px-4 md:px-8 lg:px-16 py-8">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;