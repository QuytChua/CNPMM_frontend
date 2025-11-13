import React, { useState, useEffect } from "react";
import { groupAPI } from "../services/api";

export default function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    kind: 0,
    isSystemRole: false,
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await groupAPI.getList();
      setGroups(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching groups:", err);
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
      await groupAPI.create(formData);
      setFormData({
        name: "",
        description: "",
        kind: 0,
        isSystemRole: false,
      });
      setShowForm(false);
      fetchGroups();
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý nhóm</h1>
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
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Tên nhóm"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              placeholder="Mô tả"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isSystemRole"
                checked={formData.isSystemRole}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <label className="ml-2">Là vai trò hệ thống</label>
            </div>
            <select
              name="kind"
              value={formData.kind}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Loại 0</option>
              <option value={1}>Loại 1</option>
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
                Tên nhóm
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Vai trò hệ thống
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              groups.map((group) => (
                <tr key={group.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {group.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {group.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {group.description || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {group.isSystemRole ? "✓" : "✗"}
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
