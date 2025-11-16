import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'planosativos/codAss'})
  getPlanosAtivos(@Payload() payload: { codAss: string }) {
    return this.appService.getPlanosAtivos(payload.codAss);
  }

  @EventPattern("PagamentoPlanoServicoPlanosAtivos")
  handlePagamentoPlano(@Payload() payload: { codAss: string, dataPagamento: Date }) {
    this.appService.handlePagamentoPlano(payload.codAss, payload.dataPagamento);
  }
}
