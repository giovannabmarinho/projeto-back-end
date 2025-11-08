import { Module } from "@nestjs/common";
import { GestaoController } from "./gestao.controller";
import { GestaoService } from "./gestao.service";

@Module({
    imports: [],
    controllers: [GestaoController],
    providers: [GestaoService],
    exports: [GestaoService],
})
export class GestaoModule {}