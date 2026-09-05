import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiObject } from '../models/api-object';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  private http = inject(HttpClient);

  private apiUrl = 'https://api.restful-api.dev/objects';

  objects = signal<ApiObject[]>([]);


  load() {
    this.http.get<ApiObject[]>(this.apiUrl)
      .subscribe(data => {
        this.objects.set(data);
      });
  }


  add(obj: ApiObject) {

    this.http.post<ApiObject>(this.apiUrl, obj)
      .subscribe(created => {

        this.objects.update(list => [
          ...list,
          created
        ]);

      });

  }

}