import { Module } from '@nestjs/common';
import { GestaoModule } from './gestao/gestao.module';

@Module({
  imports: [GestaoModule],
})
export class AppModule {}

