import { CloseOutlined, LockOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  Alert,
  Typography,
  AlertTitle,
  IconButton,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Fade,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";

import background from "../../assets/images/background.webp";
import { useAuth } from "../../contexts/auth/AuthContext";
import { theme } from "../../styles/theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading, error } = useAuth();

  function handleSubmit() {
    handleLogin(email, password);
  }

  return (
    <Fade in timeout={1000}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlined htmlColor={theme.palette.primary.contrastText} />
            </Avatar>
            <Box component="main">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(n) => setEmail(n.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(n) => setPassword(n.target.value)}
              />
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading} onClick={handleSubmit}>
                {loading && <CircularProgress />}
                {!loading && "Entrar"}
              </Button>

              {error && (
                <Alert
                  severity="error"
                  color="error"
                  action={
                    <IconButton aria-label="close" color="inherit" size="small">
                      <CloseOutlined fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Alerta!</AlertTitle>
                  <Typography>{error}</Typography>
                </Alert>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fade>
  );
}
