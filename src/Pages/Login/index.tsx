import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Providers/Auth";
import { History } from "history";
import { Container } from "./styles";

type ISubmitInfos = {
  email: string;
  password: string;
};

function Login() {
  const { signIn, token } = useAuth();

  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const schema = yup.object().shape({
    email: yup.string().email().required("Campo obrigatório"),
    password: yup
      .string()
      .min(4, "Mínimo de 4 dígitos")
      .required("Campo obrigatório"),
  });

  const history: History = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitInfos>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    signIn({ data, setError, history });
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            {...register("email", { required: true })}
            margin="normal"
            variant="outlined"
            label="email"
            name="email"
            size="small"
            color="primary"
            error={!!errors.email}
            helperText={errors.email?.message}
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          ></TextField>
        </div>

        <div>
          <TextField
            {...register("password", { required: true })}
            type="password"
            variant="outlined"
            margin="normal"
            label="senha"
            size="small"
            color="primary"
            name="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          ></TextField>
        </div>
        <Button type="submit" variant="contained" color="primary" size="large">
          Enviar
        </Button>
      </form>
      {error && <span> Usuário ou senha incorretas! </span>}
    </Container>
  );
}

export default Login;
