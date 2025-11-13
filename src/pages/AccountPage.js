import React, { useState, useEffect } from "react";
import { accountAPI } from "../services/api";

export default function AccountPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    phone: "",
    kind: 0,
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountAPI.getList();
      setAccounts(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountAPI.create(formData);
      setFormData({
        username: "",
        email: "",
        fullName: "",
        password: "",
        phone: "",
        kind: 0,
      });
      setShowForm(false);
      fetchAccounts();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? "Hủy" : "Tạo mới"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="kind"
              value={formData.kind}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Admin</option>
              <option value={1}>User</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Lưu
          </button>
        </form>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              accounts.map((account) => (
                <tr key={account.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {account.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {account.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {account.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {account.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {account.phone || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {account.kind === 0 ? "Admin" : "User"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Sửa
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
