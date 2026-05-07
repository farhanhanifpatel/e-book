import { useEffect, useState } from "react";
import { register } from "../api/auth.api";
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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now login to your account",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong",
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
            Register
          </Typography>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
