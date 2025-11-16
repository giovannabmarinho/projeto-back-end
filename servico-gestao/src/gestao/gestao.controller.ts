import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { GestaoService } from './gestao.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class GestaoController {
  constructor(private readonly gestaoService: GestaoService) {}

  @MessagePattern({ cmd: 'clientes' })
  getClientes() {
    return this.gestaoService.getClientes();
  }

  @MessagePattern({ cmd: 'planos' })
  getPlanos() {
    return this.gestaoService.getPlanos();
  }

  @MessagePattern({ cmd: 'planos/update' })
  updatePlano(@Payload() payload: { idPlano: string; custoMensal: number }) {
    return this.gestaoService.updatePlano(payload.idPlano, {
      custoMensal: payload.custoMensal,
    });
  }

  @MessagePattern({ cmd: 'assinaturas' })
  createAssinatura(@Body() createAssinaturaDto: CreateAssinaturaDto) {
    return this.gestaoService.createAssinatura(createAssinaturaDto);
  }

  @MessagePattern({ cmd: 'assinaturas/tipo' })
  getAssinaturasByTipo(@Payload() payload: { tipo: string }) {
    return this.gestaoService.getAssinaturasByTipo(payload.tipo);
  }

  @MessagePattern({ cmd: 'assinaturascliente/codCli' })
  getAssinaturasCliente(@Payload() payload: { codCli: string }) {
    return this.gestaoService.getAssinaturasCliente(payload.codCli);
  }

  @MessagePattern({ cmd: 'assinaturasplano/codPlano' })
  getAssinaturasPlano(@Payload() payload: { codPlano: string }) {
    return this.gestaoService.getAssinaturasPlano(payload.codPlano);
  }

  @EventPattern('PagamentoPlanoServicoGestao')
  handlePagamentoPlano(
    @Payload() payload: { codAss: string; dataPagamento: Date },
  ) {
    console.log(payload);
    this.gestaoService.handlePagamentoPlano(
      payload.codAss,
      payload.dataPagamento,
    );
  }
}
