import { useState } from "react";
import FormField from "./FormField";
import { accountAPI } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    if (
      !formData.username ||
      !formData.email ||
      !formData.fullName ||
      !formData.password
    ) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      const response = await accountAPI.create({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        kind: 1, // 1 = User
      });

      setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
      });
      console.log("Register response:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Đăng ký thất bại"
      );
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <FormField
        label="Tên đăng nhập"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="nguyenvana"
        required
      />
      <FormField
        label="Họ tên"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Nguyễn Văn A"
        required
      />
      <FormField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        required
      />
      <FormField
        label="Số điện thoại"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="0123456789"
      />
      <FormField
        label="Mật khẩu"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        required
      />
      <FormField
        label="Nhập lại mật khẩu"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Đang đăng ký..." : "Đăng Ký"}
      </button>
    </form>
  );
}
