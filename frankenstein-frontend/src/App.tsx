import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Home from "./Pages/Home/Home";
import CreateContact from "./Pages/CreateContact/CreateContact";
import NavBar from "./components/NavBar/NavBar";
import SidBar from "./components/SideBar/SideBar";
import { Card } from "@material-tailwind/react";
import ContactIndex from "./Pages/ContactIndex/ContactIndex";
import { ToastContainer, Zoom } from "react-toastify";
import FPageTitleUpdater from "./layout/FPageTitleUpdater";

function App() {
  return (
    <BrowserRouter>
      <FPageTitleUpdater />
      <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-screen">
        <NavBar />
        <SidBar />
        <div id="app" className="px-8 pt-12 pb-6">
          <Card className="p-5 w-full" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Zoom}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactIndex />} />
              <Route path="/contact/create" element={<CreateContact />} />
            </Routes>
          </Card>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
