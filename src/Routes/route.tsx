import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../Providers/Auth";
interface IRouteProps {
  isPrivate: boolean;
  component: any;
  path: string;
  exact: boolean;
}

const Route = ({
  isPrivate,
  component: Component,
  path,
  exact,
}: IRouteProps) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      path=""
      exact
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
