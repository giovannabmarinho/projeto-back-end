import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { GestaoModule } from './gestao/gestao.module';

@Module({
  imports: [PrismaModule, GestaoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

