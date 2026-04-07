import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';

export type PlataformsResponse = {
  results: {id: number, name: string}[]
}

@Injectable({
  providedIn: 'root',
})
export class FormsApi {
  private http = inject(HttpClient);

  public getGamesPlataforms(): Observable<{id: number, name: string}[]>{
    return this.http
      .get<PlataformsResponse>(`${environment.apiUrl}/platforms?${environment.key}`)
      .pipe(map((result) => result.results.map(({ id, name }) => ({ id, name }))));
  }
}
