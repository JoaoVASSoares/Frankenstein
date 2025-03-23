import { useState, useEffect } from "react";
import { Box, Button, Container, IconButton, InputAdornment, Paper, TextField, Typography, FormControlLabel, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../../../store/authStore";
import { loginForm, loginSchema } from "../../../utils/ZodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setError,
  } = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(() => {
    return localStorage.getItem("remember") === "true";
  });
  const [login, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);
  const setRememberMe = useAuthStore(state => state.setRememberMe);

  const onSubmit = async (data: loginForm) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/authentication/login", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Login inválido");
      console.log(response);
      const user = await response.json();
      console.log(user);
      setUser(user);
      setRememberMe(remember);

      // Salva escolha no localStorage
      localStorage.setItem("remember", remember.toString());

      navigate("/home");
    } catch (error) {
      setError("email", { type: "manual", message: "E-mail ou senha inválidos" });
      setError("password", { type: "manual", message: "E-mail ou senha inválidos" });
      reset();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Entrar
        </Typography>
        <Typography color="textSecondary">Preencha os campos para entrar</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, mb: 3 }}>
          <TextField label="E-mail" fullWidth {...register("email")} helperText={errors.email?.message} margin="normal" />
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password")}
            helperText={errors.password?.message}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="current-password"
          />

          <FormControlLabel control={<Switch checked={remember} onChange={e => setRemember(e.target.checked)} />} label="Manter-se logado" sx={{ mt: 2 }} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </Box>

        <Typography color="textSecondary" className="mt-4 text-center font-normal">
          Não tem uma conta ainda?
          <Link to="/register" className="font-medium text-black ml-1">
            Registre-se
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
