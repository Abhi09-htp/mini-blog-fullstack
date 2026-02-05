import { useState } from "react";
import useApi from "../api/useApi";

export default function Register() {
const { request, loading, error, clearError } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (!email || !password) return;

    await request({
      url: "/auth/register",
      method: "POST",
      body: { email, password },
    });

    // optional: clear fields after register
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Register</h2>

      <input
        type="email"
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
        Register
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
