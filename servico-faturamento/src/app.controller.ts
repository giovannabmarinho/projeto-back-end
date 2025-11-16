import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'registrarpagamento'})
  async registrarPagamento(@Payload() body: { dia: number, mes: number, ano: number, codAss: number, valorPago: number }) {
    const dataPagamento = new Date(body.ano, body.mes - 1, body.dia);
    await this.appService.registrarPagamento(dataPagamento, body.codAss, body.valorPago);
    return "ok"
  }
}
