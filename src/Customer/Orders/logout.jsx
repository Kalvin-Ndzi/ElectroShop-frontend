const apiUrl = "https://electroshop-backend.onrender.com/api";

const handleLogout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    await fetch(`${apiUrl}/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
  } catch (err) {
    console.error("Logout error:", err);
  }

  localStorage.clear();
  window.location.href = "/";
};

export default handleLogout;
