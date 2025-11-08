import { Controller, Get, Post, Patch, Param } from "@nestjs/common";

@Controller("gestao")
export class GestaoController {
    constructor(){}

    @Get("clientes")
    getClientes() {
        return {};
    }

    @Get("planos")
    getPlanos() {
        return {};
    }

    @Post("assinaturas")
    createAssinatura() {
        return {};
    }

    @Patch("planos/:idPlano")
    updatePlano(@Param("idPlano") idPlano: string) {
        return {};
    }

    @Get("assinaturas/:tipo")
    getAssinaturasByTipo(@Param("tipo") tipo: string) {
        return {};
    }

    @Get("assinaturascliente/:codCli")
    getAssinaturasCliente(@Param("codCli") codCli: string) {
        return {};
    }

    @Get("assinaturasplano/:codPlano")
    getAssinaturasPlano(@Param("codPlano") codPlano: string) {
        return {};
    }

}