import React, { useState } from 'react';
import styled from 'styled-components';

function encodeFormData(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const loginRoute = 'https://keeperappapi.onrender.com/login';
const registerRoute = 'https://keeperappapi.onrender.com/register';

const Container = styled.div`
  font-family: "Montserrat", sans-serif;
  max-width: 400px;
  margin: 100px auto;
  padding: 40px; 
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #f5ba13;
  color: white;
  padding: 10px;
  border: 30px;
  cursor: pointer;
  &:hover {
    background-color: #f7ce59;
  }
`;

const P = styled.p`
  margin-top: 15px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const LoginRegister = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage("");  // Clear error message when switching forms
        setSuccessMessage(""); // Clear success message when switching forms
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous error
        setSuccessMessage(""); // Clear previous success message
        
        const route = isLogin ? loginRoute : registerRoute;
        const bodyData = isLogin
            ? { username: formData.username, password: formData.password }
            : { username: formData.username, password: formData.password, email: formData.email };

        try {
            const response = await fetch(route, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encodeFormData(bodyData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }

            if (isLogin) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                props.onLogin(data.token);
            } else {
                setSuccessMessage("You are successfully registered!");
            }

        } catch (error) {
            setErrorMessage(error.message || "Something went wrong");
        }
    };

    return (
        <Container>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                )}
                <FormGroup>
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </FormGroup>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                <Button type="submit">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </form>
            <P>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <Button onClick={toggleForm}>
                    {isLogin ? 'Register' : 'Login'}
                </Button>
            </P>
        </Container>
    );
};

export default LoginRegister;
