import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PutUploadFile } from '../interfaces/validate-token';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient,
    private tokenService :TokenService
  ) { }

  actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    const formData = new FormData();
    formData.append('imagen', archivo);
    return this.http.put<PutUploadFile>(`${baseUrl}/uploads/${tipo}/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${this.tokenService.token}`
      }
    });
  }
}
