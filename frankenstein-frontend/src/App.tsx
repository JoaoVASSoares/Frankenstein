import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home/Home";
import CreateContact from "./pages/Contact/Create/CreateContact";
import { NavBar } from "./components/NavBar/NavBar";
import { Sidebar } from "./components/SideBar/SideBar";
import { Card } from "@material-tailwind/react";
import ContactIndex from "./pages/Contact/Index/ContactIndex";
import { ToastContainer, Zoom } from "react-toastify";
import FPageTitleUpdater from "./layout/FPageTitleUpdater";
import ContactEdit from "./pages/Contact/Edit/ContactEdit";
import ContactView from "./pages/Contact/View/ContactView";
import Register from "./pages/Authentication/Register/Register";
import Login from "./pages/Authentication/Login/Login";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import PrivateRoute from "./components/RouteProtect/PrivateRoute";
import PublicRoute from "./components/RouteProtect/PublicRoute";

function App() {
  const fetchUser = useAuthStore(state => state.fetchUser);

  useEffect(() => {
    const remember = localStorage.getItem("remember") === "true";

    if (remember) {
      fetchUser();
    } else {
      useAuthStore.getState().logout();
    }
  }, []);

  return (
    <BrowserRouter>
      <FPageTitleUpdater />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        
        {/* Estrutura principal com Sidebar e NavBar */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex flex-col flex-grow">
                  <NavBar />

                  <main className="flex-grow p-6">
                    <div id="app" className="px-4 pt-12">
                      <Card className="p-5 w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                          <Route path="/contact/edit/:id" element={<ContactEdit />} />
                          <Route path="/contact/view/:id" element={<ContactView />} />
                        </Routes>
                      </Card>
                    </div>
                  </main>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
