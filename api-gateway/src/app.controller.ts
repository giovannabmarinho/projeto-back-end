import { All, Body, Controller, Get, Inject, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { type Response, type Request } from 'express';
import { firstValueFrom, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('SERVICO_GESTAO') private readonly clientGestao: ClientProxy,
    @Inject('SERVICO_FATURAMENTO') private readonly clientFaturamento: ClientProxy,
    @Inject('SERVICO_PLANOS_ATIVOS') private readonly clientPlanosAtivos: ClientProxy,
  ) {}

  @Get("gestao/clientes")
  async getClientes() {
    return firstValueFrom(this.clientGestao.send({ cmd: 'clientes' }, {}));
  }

  @Get("gestao/planos")
  async getPlanos() {
    return firstValueFrom(this.clientGestao.send({ cmd: 'planos' }, {}));
  }

  @Patch("gestao/planos/:idPlano")
  async updatePlano(@Param('idPlano') idPlano: string, @Body() body: { custoMensal: number }) {
    return firstValueFrom(this.clientGestao.send({ cmd: `planos/update` }, { idPlano, custoMensal: body.custoMensal }));
  }

  @Post("gestao/assinaturas")
  async createAssinatura(@Body() body: { codPlano: number, codCli: number }) {
    return firstValueFrom(this.clientGestao.send({ cmd: 'assinaturas' }, body));
  }

  @Get("gestao/assinaturas/:tipo")
  async getAssinaturasByTipo(@Param('tipo') tipo: string) {
    return firstValueFrom(this.clientGestao.send({ cmd: `assinaturas/tipo` }, { tipo }));
  }

  @Get("gestao/assinaturascliente/:codCli")
  async getAssinaturasCliente(@Param('codCli') codCli: string) {
    return firstValueFrom(this.clientGestao.send({ cmd: `assinaturascliente/codCli` }, { codCli }));
  }

  @Get("gestao/assinaturasplano/:codPlano")
  async getAssinaturasPlano(@Param('codPlano') codPlano: string) {
    return firstValueFrom(this.clientGestao.send({ cmd: `assinaturasplano/codPlano` }, { codPlano }));
  }

  @Post("registrarpagamento")
  async registrarPagamento(@Body() body: { dia: number, mes: number, ano: number, codAss: number, valorPago: number }) {
    await firstValueFrom(this.clientFaturamento.send({ cmd: 'registrarpagamento' }, body))
  }

  @Get("planosativos/:codAss")
  async getPlanosAtivos(@Param('codAss') codAss: string) {
    return firstValueFrom(this.clientPlanosAtivos.send({ cmd: `planosativos/codAss` }, { codAss }));
  }
}
