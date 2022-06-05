import { Usuario } from "./login-form";

export interface GetCargarUsuarios {
  ok:       boolean;
  usuarios: Usuario[];
  total:    number;
}
