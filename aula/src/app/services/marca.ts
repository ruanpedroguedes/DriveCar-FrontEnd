import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';
import { tap } from 'rxjs/operators'; // Importação necessária

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private http = inject(HttpClient);
  private API = "http://localhost:8081/api/marca/";

  findAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.API + "findAll").pipe(
      tap((data: Marca[]) => console.log('Dados recebidos no Service:', data))
    );
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "deleteById/" + id, { responseType: 'text' as 'json' });
  }

  save(marca: Marca): Observable<string> {
    return this.http.post<string>(this.API + "save", marca, { responseType: 'text' as 'json' });
  }

  update(marca: Marca, id: number): Observable<string> {
    return this.http.put<string>(this.API + "update/" + id, marca, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API + "findById/" + id);
  }
}