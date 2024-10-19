import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Fill all the required fields");
        } else {
            setLoading(true); // Start the loading spinner
            try {
                const res = await fetch("https://note-app-u86o.onrender.com/Login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.msg);
                } else {
                    localStorage.setItem("token", data.token);
                    navigate("/Notes");
                }
            } catch (e) {
                console.log(e);
                alert("An error occurred during login.");
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        }
    };

    return (
        <div id="login">
            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div id="login-data">
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        <h1>Login</h1>
                    </div>
                    <div>
                        <label style={{color:"black"}}>
                            Email:<br /><br />
                            <input
                                type="text"
                                placeholder="Email id or Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <br /><br /><br />
                        <label style={{color:"black"}}>
                            Password:<br /><br />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <a
                            id="notHaveAcc"
                            onClick={() => {
                                navigate("/Signup");
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Don't have an account? Create here
                        </a>
                    </div>
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
