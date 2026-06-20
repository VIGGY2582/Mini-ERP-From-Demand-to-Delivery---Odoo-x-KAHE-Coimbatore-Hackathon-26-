import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Admin from "./components/Admin/Admin.jsx";
import User from "./components/User/User.jsx";
function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route
              path="/"
              element={<Home />}
          />

          <Route
              path="/login"
              element={<Login />}
          />

            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;