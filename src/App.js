import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";
import UpdateUser from "./pages/update-user/UpdateUser";
import PostUser from "./pages/post-user/PostUser";

function App() {
  const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/user/:id/edit"
          element={<PrivateRoute element={<UpdateUser />} />}
        />
        <Route path="/user" element={<PrivateRoute element={<PostUser />} />} />
      </Routes>
    </>
  );
}

export default App;
