import { useState } from "react";
import FormField from "./FormField";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    // Simulate login - in real app, you'd call an API
    setTimeout(() => {
      console.log("Login:", { email, password });
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
      />
      <FormField
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
          <span className="ml-2 text-gray-600">Ghi nhớ tôi</span>
        </label>
        <button type="button" className="text-indigo-600 hover:underline">
          Quên mật khẩu?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
      </button>
    </form>
  );
}
