import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { GestaoService } from "./gestao.service";
import { CreateAssinaturaDto } from "./dto/create-assinatura.dto";

@Controller("gestao")
export class GestaoController {
    constructor(private readonly gestaoService: GestaoService) { }

    @Get("clientes")
    getClientes() {
        return this.gestaoService.getClientes();
    }

    @Get("planos")
    getPlanos() {
        return this.gestaoService.getPlanos();
    }

    @Post("assinaturas")
    createAssinatura(@Body() createAssinaturaDto: CreateAssinaturaDto) {
        return this.gestaoService.createAssinatura(createAssinaturaDto);
    }

    @Patch("planos/:idPlano")
    updatePlano(
        @Param("idPlano") idPlano: string,
        @Body() updatePlanoDto: { custoMensal: number }
    ) {
        return this.gestaoService.updatePlano(idPlano, updatePlanoDto);
    }

    @Get("assinaturas/:tipo")
    getAssinaturasByTipo(@Param("tipo") tipo: string) {
        return this.gestaoService.getAssinaturasByTipo(tipo);
    }

    @Get("assinaturascliente/:codCli")
    getAssinaturasCliente(@Param("codCli") codCli: string) {
        return this.gestaoService.getAssinaturasCliente(codCli);
    }

    @Get("assinaturasplano/:codPlano")
    getAssinaturasPlano(@Param("codPlano") codPlano: string) {
        return this.gestaoService.getAssinaturasPlano(codPlano);
    }
}