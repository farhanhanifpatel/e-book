import { useEffect, useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user, refreshUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await login({ email, password });

      await refreshUser();

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
          >
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 2,
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
