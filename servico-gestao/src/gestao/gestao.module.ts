import { Module } from "@nestjs/common";
import { GestaoController } from "./gestao.controller";
import { GestaoService } from "./gestao.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [GestaoController],
    providers: [GestaoService],
    exports: [GestaoService],
})
export class GestaoModule {}