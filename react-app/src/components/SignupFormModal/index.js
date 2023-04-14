import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstname, setfirstname] = useState("");
	const [lastname, setlastname] = useState("");
	const [bio, setBio] = useState("");
	const [icon, setIcon] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstname, lastname, bio, icon));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					
					<input
						className="signup-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</label>
				<label>
					
					<input
					className="signup-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				<label>
					
					<input
					className="signup-input"
						type="text"
						value={firstname}
						onChange={(e) => setfirstname(e.target.value)}
						required
						placeholder="First name"
					/>
				</label>
				<label>
					
					<input
					className="signup-input"
						type="text"
						value={lastname}
						onChange={(e) => setlastname(e.target.value)}
						required
						placeholder="Last name"
					/>
				</label>
				<label>
					
					<input
					className="signup-input"
						type="text"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						placeholder="bio"
					/>
				</label>
				<label>
					
					<input
					className="signup-input"
						type="text"
						value={icon}
						onChange={(e) => setIcon(e.target.value)}
						placeholder="icon url"
					/>
				</label>
				<label>
					
					<input
					className="signup-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</label>
				<label>
			
					<input
					className="signup-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm password"
					/>
				</label>
				<button type="submit" className="signup-button">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
