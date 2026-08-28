import { useContext } from "react";
import { AdminContext } from "./AdminContextValue";

export function useAdminData() {
  return useContext(AdminContext);
}
