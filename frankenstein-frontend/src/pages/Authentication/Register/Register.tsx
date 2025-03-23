import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, TextField, Button, Typography, Box, Paper, Checkbox, FormControlLabel, Alert, IconButton, InputAdornment } from "@mui/material";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { RegisterFormData, registerSchema } from "../../../utils/ZodValidation";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Usuário cadastrado:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro ao criar contato",
          text: "Ocorreu um erro inesperado.",
        });

        return;
      }

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro na requisição",
        text: "Não foi possível enviar os dados. Verifique sua conexão e tente novamente. " + error,
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Criar Conta
        </Typography>
        <Typography color="textSecondary">Preencha os campos para criar sua conta</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, mb: 3 }}>
          <TextField label="Nome" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} margin="normal" />

          <TextField label="E-mail" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal" />

          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password")}
            error={!!errors.password}
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
            autoComplete="password"
          />

          <TextField
            label="Confirme a Senha"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="confirmePassword"
          />

          <FormControlLabel control={<Checkbox {...register("terms")} />} label="Eu aceito os termos e condições" />
          {errors.terms && <Alert severity="error">{errors.terms.message}</Alert>}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Registrar
          </Button>
        </Box>
        <Typography color="textSecondary" className="mt-4 text-center font-normal">
          Já tem uma conta ?
          <Link to="/login" className="font-medium text-black ml-1">
            Entrar
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
