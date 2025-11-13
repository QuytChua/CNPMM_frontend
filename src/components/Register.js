import { useState } from "react";
import FormField from "./FormField";
import { accountAPI } from "../services/api";

export default function Register() {
  const [step, setStep] = useState("register"); // register, otp-verification
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
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
      const response = await accountAPI.sendOTP({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
      });

      setSuccess("OTP đã được gửi đến email của bạn!");
      setRegisteredEmail(formData.email);
      setStep("otp-verification");
      console.log("OTP sent:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Gửi OTP thất bại"
      );
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.trim().length === 0) {
      setError("Vui lòng nhập mã OTP!");
      return;
    }

    try {
      setLoading(true);
      const response = await accountAPI.verifyOTP({
        email: registeredEmail,
        otp: otp,
      });

      setSuccess("Xác thực thành công! Vui lòng đăng nhập.");
      setOtp("");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
      });
      setStep("register");
      setRegisteredEmail("");
      console.log("Verify response:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Xác thực OTP thất bại"
      );
      console.error("OTP verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await accountAPI.sendOTP({
        email: registeredEmail,
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
      });

      setSuccess("OTP mới đã được gửi đến email của bạn!");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Gửi lại OTP thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={step === "register" ? handleRegisterSubmit : handleOTPSubmit}
      className="space-y-5"
    >
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

      {step === "register" ? (
        <>
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
            {loading ? "Đang gửi OTP..." : "Đăng Ký & Nhận OTP"}
          </button>
        </>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
            <p className="font-semibold">Xác thực email</p>
            <p className="text-sm">
              Mã OTP đã được gửi đến <strong>{registeredEmail}</strong>
            </p>
          </div>

          <FormField
            label="Mã OTP"
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập 6 chữ số"
            maxLength="6"
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang xác thực..." : "Xác Thực OTP"}
            </button>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang gửi..." : "Gửi Lại OTP"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setStep("register");
              setOtp("");
              setRegisteredEmail("");
              setError("");
              setSuccess("");
            }}
            className="w-full text-indigo-600 hover:text-indigo-700 font-semibold py-2 transition"
          >
            ← Quay lại
          </button>
        </>
      )}
    </form>
  );
}
