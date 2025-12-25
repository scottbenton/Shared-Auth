import { createContext } from "react";

export interface IAuthContext {
  uid: string | null;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  uid: null,
  loading: true,
});
