import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Providers/Auth";
import { History } from "history";
import { Container } from "./styles";
import { Product } from "../../Interfaces";

interface IonSubmit {
  data: {
    Headers: {
      token: string;
      email: string;
      password: string;
    };
  };
}

function Login() {
  const { signIn, token } = useAuth();

  const [error, setError] = useState<boolean>(false);

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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ data }: IonSubmit) => {
    signIn({ data, setError, history });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            {...register("test", { required: true })}
            margin="normal"
            variant="outlined"
            label="email"
            name="email"
            size="small"
            color="primary"
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            {...register("test", { required: true })}
            variant="outlined"
            margin="normal"
            label="senha"
            size="small"
            color="primary"
            name="password"
            error={!!errors.password}
            helperText={errors.password?.message}
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
