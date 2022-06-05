export interface LoginForm {
  email: string,
  password: string,
  usuario: Usuario;
}

export interface Usuario {
    nombre: string;
    email:  string;
    img:    string;
    role:   string;
    google: boolean;
    uid:    string;
}
