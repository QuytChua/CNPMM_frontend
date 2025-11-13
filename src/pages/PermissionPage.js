import React, { useState, useEffect } from "react";
import { permissionAPI } from "../services/api";

export default function PermissionPage() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    permissionCode: "",
    action: "",
    description: "",
    nameGroup: "",
    showMenu: false,
  });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await permissionAPI.getList();
      setPermissions(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching permissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await permissionAPI.create(formData);
      setFormData({
        name: "",
        permissionCode: "",
        action: "",
        description: "",
        nameGroup: "",
        showMenu: false,
      });
      setShowForm(false);
      fetchPermissions();
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý quyền hạn</h1>
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
              name="name"
              placeholder="Tên quyền"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="permissionCode"
              placeholder="Mã quyền"
              value={formData.permissionCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="action"
              placeholder="Action"
              value={formData.action}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nameGroup"
              placeholder="Nhóm quyền"
              value={formData.nameGroup}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Mô tả"
              value={formData.description}
              onChange={handleInputChange}
              rows="2"
              className="col-span-2 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center col-span-2">
              <input
                type="checkbox"
                name="showMenu"
                checked={formData.showMenu}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <label className="ml-2">Hiển thị trong menu</label>
            </div>
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
                Tên quyền
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Mã quyền
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Action
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nhóm quyền
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Menu
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {permissions.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              permissions.map((permission) => (
                <tr key={permission.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {permission.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {permission.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {permission.permissionCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {permission.action || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {permission.nameGroup || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {permission.showMenu ? "✓" : "✗"}
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
