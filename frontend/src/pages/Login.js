import { useState } from "react";
import useApi from "../api/useApi";
import useAuthStore from "../store/authStore";

export default function Login() {
const { request, loading, error, clearError } = useApi();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
     console.log("LOGIN CLICKED");
    const data = await request({
      url: "/auth/login",
      method: "POST",
      body: { email, password },
    });
      console.log("LOGIN RESPONSE:", data);

    // 🔥 IMPORTANT
    if (data?.token && data?.user) {
      login(data.token, data.user);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
      
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
