import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  private localCache: Map<string, Date> = new Map();

  async getPlanosAtivos(codAss: string) {
    const trintaDiasAtras = new Date(new Date().setDate(new Date().getDate() - 30));

    if (this.localCache.has(codAss)) {
      return this.localCache.get(codAss)! > trintaDiasAtras;
    }

    const assinatura = await this.prismaService.assinatura.findUnique({
      where: {
        codigo: parseInt(codAss),
      },
    });

    if (!assinatura) {
      throw new NotFoundException('Assinatura não encontrada');
    }
    
    this.localCache.set(codAss, assinatura.dataUltimoPagamento);

    return assinatura.dataUltimoPagamento > trintaDiasAtras
  }

  async handlePagamentoPlano(codAss: string, dataPagamento: Date) {
    this.localCache.set(codAss, dataPagamento);
  }
}
