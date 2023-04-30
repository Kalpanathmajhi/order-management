import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Header from "./Header";
const Login = () => {

    const mockLoginData = {
        username: 'kalpanth-majhi',
        email: 'test@gmail.com',
        password: "12345678"
    };
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState(false);

    const [formData, setFormData] = useState({ username: "", password: "" })

    const handleInputChange = (event) => {


        const [key, value] = [event.target.name, event.target.value]
        setFormData({ ...formData, [key]: value })

    }


    const login = async (formData) => {
        if (!validateInput(formData)) {
            return
        }
        setState(true)

        if (mockLoginData.username === formData.username || mockLoginData.email === formData.username) {
            if (mockLoginData.password === formData.password) {
                enqueueSnackbar('Logged in successfully', { variant: 'success' })
                persistLogin(mockLoginData.username)
                navigate('/')

            }
            else {
                enqueueSnackbar('Password is incorrect .', { variant: "error" })
            }
        }
        else {
            enqueueSnackbar('Username or email is incorrect .', { variant: "error" })

        }

        setState(false)
    };

    const validateInput = (data) => {
        if (!data.username) {
            
            enqueueSnackbar("Username is a required field", { variant: 'warning' });
            return false
        }
        if (data.username.length < 6) {
            enqueueSnackbar("Username must be at least 6 characters", { variant: 'warning' });
            return false
        }
        if (!data.password) {
            enqueueSnackbar("Password is a required field", { variant: 'warning' });
            return false
        }
        if (data.password.length < 6) {
            enqueueSnackbar("Password must be at least 6 characters", { variant: 'warning' });
            return false
        }


        return true;
    };


    const persistLogin = (username,) => {

        localStorage.setItem("username", username)

    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            //   justifyContent="space-between"
            minHeight="100vh"
        >
            <Header />
            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">{"Login To Orders"}</h2>
                    <TextField
                        id="username"
                        label="Username Or Email"
                        variant="outlined"
                        title="Username"
                        name="username"
                        value={formData.username}
                        placeholder="Enter Username or Email"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}

                        fullWidth
                        placeholder="Enter a password with minimum 6 characters"
                        onChange={handleInputChange}

                    />
                    <Button className="button" variant="contained" onClick={async () => { login(formData) }} name='Login'>
                        {state ? <CircularProgress /> : "Login"}
                    </Button>

                </Stack>
            </Box>

        </Box>
    );
};

export default Login;
