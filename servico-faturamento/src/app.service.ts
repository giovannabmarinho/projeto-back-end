import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('SERVICO_GESTAO') private readonly clientGestao: ClientProxy,
    @Inject('SERVICO_PLANOS_ATIVOS') private readonly clientPlanosAtivos: ClientProxy,
  ) {}

  async registrarPagamento(dataPagamento: Date, codAss: number, valorPago: number) {
    await this.prismaService.pagamento.create({
      data: {
        dataPagamento,
        codAss,
        valorPago,
      },
    });

    this.clientPlanosAtivos.emit('PagamentoPlanoServicoPlanosAtivos', { codAss, dataPagamento });
    this.clientGestao.emit('PagamentoPlanoServicoGestao', { codAss, dataPagamento });
  }
}
