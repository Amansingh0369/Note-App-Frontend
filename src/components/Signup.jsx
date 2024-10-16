import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Signup() {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handelSignup = async () => {
        if(!name || !email || !password){
            return alert(" Fill all the Required field");
        }
        try{
            const res = await fetch("https://note-app-u86o.onrender.com/Signup",{
                method:"POST",
                headers:{ "Content-Type": "application/json"},
                body:JSON.stringify({name, email, password})
            })
            if(!res.ok){
                const data = await res.json();
                alert(data.msg)
            }else{
                const data = await res.json();
                setName("");
                setEmail("")
                setPassword("")
                navigate("/Login")
            }
        }catch (e) {
            console.log(e);
            alert("failed to store data")
        }
    }
    return (
            <div id="signup">
                <div id="signup-data">
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <h1>Signup</h1>
                    </div>
                    <div id="signup-input">
                        <p>Name:</p>
                        <input type="text" placeholder="Enter your Full name" value={name}
                            onChange={(e)=>setName(e.target.value)}/>
                        <p>Email Id:</p>
                        <input type="text" placeholder="Enter your Email id" value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                        <p>Password:</p>
                        <input type="password" placeholder="Password" value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <br/>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <button onClick={handelSignup}>Signup</button>
                    </div>
                </div>
            </div>
    )
}
export default Signup;