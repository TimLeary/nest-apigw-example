import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from "./app.service";
import { TodoService } from './todo/todo.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly todoService: TodoService
  ) {}

  @Get("/ping-a")
  pingServiceA() {
    return this.appService.pingServiceA();
  }

  @Get("/ping-b")
  pingServiceB() {
    return this.appService.pingServiceB();
  }

  @Get("/ping-all")
  pingAll() {
    return zip(
      this.appService.pingServiceA(),
      this.appService.pingServiceB()
    ).pipe(
      map(([pongServiceA, pongServiceB]) => ({
        pongServiceA,
        pongServiceB
      }))
    );
  }

  @Get("/user/:id/todos")
  findUserTodos(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getAllByUserId(id);
  }

  @Get("/todos/:id")
  findTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.find(id);
  }
}