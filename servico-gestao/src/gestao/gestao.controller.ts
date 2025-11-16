import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { GestaoService } from "./gestao.service";
import { CreateAssinaturaDto } from "./dto/create-assinatura.dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class GestaoController {
    constructor(private readonly gestaoService: GestaoService) { }

    @MessagePattern({cmd: 'clientes'})
    getClientes() {
        return this.gestaoService.getClientes();
    }

    @MessagePattern({cmd: 'planos'})
    getPlanos() {
        return this.gestaoService.getPlanos();
    }

    @MessagePattern({cmd: 'assinaturas'})
    createAssinatura(@Body() createAssinaturaDto: CreateAssinaturaDto) {
        return this.gestaoService.createAssinatura(createAssinaturaDto);
    }

    @MessagePattern({cmd: 'planos/:idPlano'})
    updatePlano(
        @Param("idPlano") idPlano: string,
        @Body() updatePlanoDto: { custoMensal: number }
    ) {
        return this.gestaoService.updatePlano(idPlano, updatePlanoDto);
    }

    @MessagePattern({cmd: 'assinaturas/:tipo'})
    getAssinaturasByTipo(@Param("tipo") tipo: string) {
        return this.gestaoService.getAssinaturasByTipo(tipo);
    }

    @MessagePattern({cmd: 'assinaturascliente/:codCli'})
    getAssinaturasCliente(@Param("codCli") codCli: string) {
        return this.gestaoService.getAssinaturasCliente(codCli);
    }

    @MessagePattern({cmd: 'assinaturasplano/:codPlano'})
    getAssinaturasPlano(@Param("codPlano") codPlano: string) {
        return this.gestaoService.getAssinaturasPlano(codPlano);
    }
}