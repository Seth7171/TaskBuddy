import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Add fullName state
  const [age, setAge] = useState(''); // Add age state
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, fullName, age); // Pass fullName and age to the signup function
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>Full Name:</label> {/* Add Full Name input */}
      <input
        type="text"
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
      />

      <label>Age:</label> {/* Add Age input */}
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
