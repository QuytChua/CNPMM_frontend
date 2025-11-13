import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/AccountPage";
import GroupPage from "./pages/GroupPage";
import PermissionPage from "./pages/PermissionPage";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </h2>

            {isLogin ? (
              <Login onSuccess={() => setIsAuthenticated(true)} />
            ) : (
              <Register />
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                  {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<AccountPage />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/permissions" element={<PermissionPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
