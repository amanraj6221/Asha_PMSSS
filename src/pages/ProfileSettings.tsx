// 📂 src/pages/ProfileSettings.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";

const ProfileSettings = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.username || !form.email) {
      return setMsg("❌ Username and email are required");
    }
    setSaving(true);
    setMsg("");
    try {
      const res = await api.put("/auth/profile", {
        username: form.username,
        email: form.email,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined,
      });
      if (res.data?.success) {
        const updatedUser = { ...user, username: form.username, email: form.email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMsg("✅ Profile updated successfully!");
        setForm((f) => ({ ...f, currentPassword: "", newPassword: "" }));
      } else {
        setMsg(`❌ ${res.data?.message || "Update failed"}`);
      }
    } catch (err: any) {
      setMsg(`❌ ${err?.response?.data?.message || "Server error"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Personal Information
        </h2>

        <div className="space-y-4">
          <Field
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 pt-2">
          Change Password
        </h2>
        <div className="space-y-4">
          <Field
            label="Current Password"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
          />
          <Field
            label="New Password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        {msg && (
          <p
            className={`text-sm font-medium ${
              msg.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Account Info */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          Account Info
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium text-gray-800">
              {user?.role || "USER"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">User ID</span>
            <span className="font-mono text-xs text-gray-600">
              {user?._id || localStorage.getItem("userId") || "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default ProfileSettings;