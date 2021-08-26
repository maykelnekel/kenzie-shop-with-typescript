import { Switch } from "react-router-dom";
import Cart from "../Pages/Cart";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Route from "./route";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} isPrivate={false} />
      <Route path="/cart" exact={false} component={Cart} isPrivate={false} />
      <Route path="/login" exact={false} component={Login} isPrivate={false} />
      <Route
        path="/dashboard"
        exact={false}
        isPrivate={true}
        component={Dashboard}
      />
    </Switch>
  );
};
export default Routes;
