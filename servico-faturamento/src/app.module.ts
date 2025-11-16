import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
  
@Module({
  imports: [PrismaModule, ClientsModule.register([
    {
      name: 'SERVICO_GESTAO',
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
    {
      name: 'SERVICO_PLANOS_ATIVOS',
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3003,
      },
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
