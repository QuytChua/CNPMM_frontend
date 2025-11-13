import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 font-semibold">
            TỔNG TÀI KHOẢN
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-2">--</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 font-semibold">TỔNG NHÓM</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">--</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 font-semibold">
            TỔNG QUYỀN HẠN
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-2">--</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 font-semibold">
            TRẠNG THÁI HỆ THỐNG
          </div>
          <div className="text-green-500 font-bold mt-2">Hoạt động</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Tổng quan hệ thống
        </h2>
        <p className="text-gray-600">
          Chào mừng đến với hệ thống quản lý nhân sự CNPMM. Sử dụng menu bên
          trái để điều hướng đến các phần chức năng khác nhau.
        </p>
      </div>
    </div>
  );
}
