
const TestLogin = () => {
    const handleLogin = () => {
      window.location.href = "http://localhost:4040/oauth2/authorization/google";
    };
  
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Login with Google</h2>
        <button onClick={handleLogin} style={{ fontSize: "18px", padding: "10px 20px" }}>
          Login
        </button>
      </div>
    );
  };
  
  export default TestLogin;
  