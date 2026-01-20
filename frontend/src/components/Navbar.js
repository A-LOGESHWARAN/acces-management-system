import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    token && (
      <div className="navbar">
        <button onClick={logout}>Logout</button>
      </div>
    )
  );
};

export default Navbar;
