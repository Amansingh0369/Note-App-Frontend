import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for spinner

    const handleSignup = async () => {
        if (!name || !email || !password) {
            return alert("Fill all the required fields");
        }

        setLoading(true); // Start the spinner when the signup process starts
        try {
            const res = await fetch("https://note-app-u86o.onrender.com/Signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.msg);
            } else {
                const data = await res.json();
                setName("");
                setEmail("");
                setPassword("");
                navigate("/Login");
            }
        } catch (e) {
            console.log(e);
            alert("Failed to store data");
        } finally {
            setLoading(false); // Stop the spinner after the signup process finishes
        }
    };

    return (
        <div id="signup">
            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div id="signup-data">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h1>Signup</h1>
                    </div>
                    <div id="signup-input">
                        <p>Name:</p>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p>Email Id:</p>
                        <input
                            type="text"
                            placeholder="Enter your email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p>Password:</p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={handleSignup}>Signup</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
