import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, Respuesta } from './categorias.model';

@NgModule({
  imports: [HttpClientModule],
})

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private uriAPP = 'http://localhost:3000/socios/v1/categorias';

  constructor(private http:HttpClient) { }

  //
  //
  getAllCategorias():Observable<Respuesta> {
    return this.http.get<Respuesta>(this.uriAPP);
  }

  //
  getCategoriaById(id: number):Observable<Respuesta> {
    return this.http.get<Respuesta>(this.uriAPP+'/'+id);
  }
  createCategoria(categoria: Categoria):Observable<Respuesta> {
    return this.http.post<Respuesta>(this.uriAPP, categoria);
  }
  updateCategoria(id: number):Observable<Respuesta> {
    return this.http.put<Respuesta>(this.uriAPP+ '/:'+id, {
      nombre: '',
      descripcion: '',
    });
  }
  deleteCategoria(id: number):Observable<Respuesta> {
    return this.http.delete<Respuesta>(this.uriAPP+'/:'+id);
  }

}
