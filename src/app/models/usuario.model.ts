import { environment } from './../../environments/environment.prod';

const baseUrl = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: string,
    public role?: string,
    public uid?: string,
  ) {
  }

  get imagenUrl() {
    if (this.img) {
      if(this.img?.includes('http')) {
        return this.img;
      }
      return `${baseUrl}/uploads/usuarios/${this.img}`;
    }
    return `${baseUrl}/uploads/usuarios/no-image.jpeg`;
  }

}
