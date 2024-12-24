import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Home from "./Pages/Home/Home";
import CreateContact from "./Pages/CreateContact/CreateContact";
import NavBar from "./components/NavBar/NavBar";
import SidBar from "./components/SideBar/SideBar";
import { Card } from "@material-tailwind/react";

function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-screen">
        <NavBar />
        <SidBar />
        <div id="app" className="px-8 pt-12 pb-6">
          <Card className="p-5 w-full" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create/contact" element={<CreateContact />} />
            </Routes>
          </Card>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
