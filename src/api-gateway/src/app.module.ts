import { HttpModule, Module } from '@nestjs/common';
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICE_A",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8888
        }
      }
    ]),
    ClientsModule.register([
      {
        name: "SERVICE_B",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8889
        }
      }
    ]),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, TodoService]
})
export class AppModule {}