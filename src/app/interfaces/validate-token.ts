import { Usuario } from './../models/usuario.model';
export interface ValidateToken {
  ok:  boolean;
  uid: string;
  token: string;
  usuario: Usuario;
}
export interface PutProfile {
  ok:  boolean;
  usuario: Usuario;
}

export interface PutUploadFile {
  ok:            boolean;
  msg:           string;
  nombreArchivo: string;
}
