import { useContext } from "react";
import { AuthContext } from "./authContext";

export function useAuthState() {
  return useContext(AuthContext);
}
