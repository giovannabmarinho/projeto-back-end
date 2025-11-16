import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'registrarpagamento'})
  registrarPagamento(@Body() body: { dataPagamento: Date, codAss: number, valorPago: number }) {
    return this.appService.registrarPagamento(body.dataPagamento, body.codAss, body.valorPago);
  }
}
