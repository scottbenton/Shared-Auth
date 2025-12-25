import { Route, Switch } from "wouter";
import AppsPage from "./apps/AppsPage";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import { AuthBlocker } from "@/context/AuthProvider/AuthBlocker";
import AccountProfilePage from "./account-profile/AccountProfilePage";
import LogoutPage from "./logout/LogoutPage";

export function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <AuthBlocker
          requireAuthStatus={{
            status: "unauthenticated",
            redirectPath: "/",
            useContinueParam: true,
          }}
        >
          <LoginPage />
        </AuthBlocker>
      </Route>
      <Route path="/register">
        <AuthBlocker
          requireAuthStatus={{
            status: "unauthenticated",
            redirectPath: "/",
            useContinueParam: true,
          }}
        >
          <RegisterPage />
        </AuthBlocker>
      </Route>
      <Route path="/profile">
        <AuthBlocker
          requireAuthStatus={{
            status: "authenticated",
            redirectPath: "/login",
            useContinueParam: true,
          }}
        >
          <AccountProfilePage />
        </AuthBlocker>
      </Route>
      <Route path="/logout">
        <AuthBlocker
          requireAuthStatus={{
            status: "authenticated",
            redirectPath: "/login",
            useContinueParam: true,
          }}
        >
          <LogoutPage />
        </AuthBlocker>
      </Route>
      <Route path="/" component={AppsPage} />
    </Switch>
  );
}
