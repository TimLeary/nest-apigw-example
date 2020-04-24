import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { TodoModel } from './todo.model';
import { response } from 'express';

@Injectable()
export class TodoService {
  constructor(private http: HttpService) {}

  async getAllByUserId(id) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
      .pipe(map(response => response.data));
  }

  async find(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(map(response => response.data));
  }
}