import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">CNPMM</h1>
        </div>
        <nav className="mt-6">
          <Link
            to="/"
            className={`block px-6 py-3 transition ${
              isActive("/") ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/accounts"
            className={`block px-6 py-3 transition ${
              isActive("/accounts") ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Quản lý tài khoản
          </Link>
          <Link
            to="/groups"
            className={`block px-6 py-3 transition ${
              isActive("/groups") ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Quản lý nhóm
          </Link>
          <Link
            to="/permissions"
            className={`block px-6 py-3 transition ${
              isActive("/permissions") ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Quản lý quyền
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Hệ thống quản lý nhân sự
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
