import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Login } from "./pages/Auth/login";
import { Register } from "./pages/Auth/register";
import NavbarV2 from "./components/NavbarV2";
import { AdminLayout } from "./layout";
import Pricing from "./pages/pricing";
import { Design } from "./pages/design";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GraphView from "./pages/design/genAi/GraphView";
import BillingSection from "./pages/billingSection";

function App() {
  const clientId = '573823221354-d175srri1ta9un581atkp7b9qenst32u.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <NavbarV2 />
        <div style={{}}>
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/start-design" element={<Design />} />
              <Route path="/graph-view" element={<GraphView />} />
              <Route path="/billing" element={<BillingSection />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
