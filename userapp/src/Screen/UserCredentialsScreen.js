import { useState } from "react"
import { signupFunction, signinFunction } from "../ServerMehtods/CRUD"
import { useNavigate } from "react-router-dom"
import { moveto } from "../Routes/Routes";


export default function UserCredentials() {
    const navigate = useNavigate();
    const [state, setstate] = useState({
        name: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    })

    function inputfields(e) {
        setstate(
            {
                ...state,
                [e.target.name]: [e.target.value]
            }
        )
    }

    async function Signin() {
        if (state.Email.length > 0 && state.Password.length > 0) {
            const res = await signinFunction({ name: state.name[0], email: state.Email[0], password: state.Password[0] })
            console.log("Sign in response : ", res)
            if (res) {
                moveto("/userloggedin", sessionStorage.getItem('fullname'), navigate)
            } else {
                alert("Invalid User")
            }
        }
    }

    function Signup() {
        if (state.ConfirmPassword.trim === state.Password.trim) {
            if (state.name.length > 0 && state.Email.length > 0 && state.Password.length > 0) {
                const res = signupFunction({ name: state.name[0], email: state.Email[0], password: state.Password[0] })
                // alert(res)
            }else{
                alert("Invalid password fields")
            }
        } else {
            alert("Invalid password fields")
        }
    }

    return (
        <div className="usercredential">
            <div className="usercredentialInnerFC">
                <div className="usercredentialMostInnerChild">
                    <label className="usercredentialLabel">Full Name</label>
                    <input className="usercredentialInput" name="name" onChange={(e) => inputfields(e)} placeholder="Full name" required />
                </div>
                <div className="usercredentialMostInnerChild">
                    <label className="usercredentialLabel">Email</label>
                    <input className="usercredentialInput" name="Email" onChange={(e) => inputfields(e)} placeholder="Email" required />
                </div>
                <div className="usercredentialMostInnerChild">
                    <label className="usercredentialLabel">Password</label>
                    <input className="usercredentialInput" name="Password" type="password" onChange={(e) => inputfields(e)} placeholder="Password" required />
                </div>
                <div className="usercredentialMostInnerChild">
                    <label className="usercredentialLabel">Confirm Password</label>
                    <input className="usercredentialInput" name="ConfirmPassword" type="password" onChange={(e) => inputfields(e)} placeholder="Confirm password" required />
                </div>
                <div className="usercredentialButtonPDIV">
                    <button className="usercredentialButtons" onClick={Signin}>Signin</button>
                    <button className="usercredentialButtons" onClick={Signup}>Signup</button>
                </div>
                <label className="usercredentialNoteLabel">Confirm password field only required for signup!</label>
            </div>
        </div>
    )
}
