import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import axios from "axios";
import { useEffect } from "react";
import { getFromStorage } from "./utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { authFailure, authSuccess } from "./redux/slices/Auth/authSlice";
import AuthGuard from "./components/Guards/AuthGuard";
import Profile from "./pages/Profile/Profile";
import { socket } from "./utils/socket";

axios.defaults.baseURL = "http://localhost:5000/api/";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    const token = getFromStorage("token");
    const user = getFromStorage("user");
    if (token && user) {
      dispatch(authSuccess({ token, user }));
    } else {
      dispatch(authFailure());
    }
  }, []);
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  if (loading) {
    return <h2>...Loading</h2>;
  }

  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
