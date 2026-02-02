import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import useAuthStore from "./store/authStore";

export default function App() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  const [refresh, setRefresh] = useState(0);

  const reloadBlogs = () => {
    setRefresh((r) => r + 1);
  };

  if (!token) {
    return (
      <div>
        <Register />
        <Login />
      </div>
    );
  }

  return (
    <div>
      <button   onClick={logout}
  style={{
    marginBottom: 20,
    background: "black",
    color: "white",
    padding: "6px 12px",
  }}
>
  Logout
</button>

      <CreateBlog onCreated={reloadBlogs} />
      <Blogs refresh={refresh} />
    </div>
  );
}
