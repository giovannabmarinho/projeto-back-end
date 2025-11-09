import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateAssinaturaDto } from "./dto/create-assinatura.dto";
import { Assinatura } from "@prisma/client";

@Injectable()
export class GestaoService {
    constructor(private readonly prismaService: PrismaService) { }

    async getClientes() {
        return this.prismaService.cliente.findMany();
    }

    async getPlanos() {
        return this.prismaService.plano.findMany();
    }

    async createAssinatura(createAssinaturaDto: CreateAssinaturaDto) {
        const umAnoAPartirDeAgora = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

        return this.prismaService.assinatura.create({
            data: { ...createAssinaturaDto, inicioFidelidade: new Date(), fimFidelidade: umAnoAPartirDeAgora, dataUltimoPagamento: new Date() },
        });
    }

    async updatePlano(idPlano: string, updatePlanoDto: { custoMensal: number }) {
        return this.prismaService.plano.update({
            where: { codigo: parseInt(idPlano) },
            data: {
                custoMensal: updatePlanoDto.custoMensal,
            },
        });
    }

    async getAssinaturasByTipo(tipo: string) {
        let assinaturas: Assinatura[] = [];
        const trintaDiasAtras = new Date(new Date().setDate(new Date().getDate() - 30));

        if (tipo === "ATIVOS") {
            assinaturas = await this.prismaService.assinatura.findMany({
                where: {
                    dataUltimoPagamento: {
                        gt: trintaDiasAtras,
                    },
                },
            });
        } else if (tipo === "CANCELADOS") {
            assinaturas = await this.prismaService.assinatura.findMany({
                where: {
                    dataUltimoPagamento: {
                        lte: trintaDiasAtras,
                    },
                },
            });
        } else {
            assinaturas = await this.prismaService.assinatura.findMany();
        }        

        return assinaturas.map(assinatura => {
            const status = assinatura.dataUltimoPagamento > trintaDiasAtras ? "ATIVO" : "CANCELADO";

            return {
                ...assinatura,
                status,
            };
        });
    }

    async getAssinaturasCliente(codCli: string) {
        const assinaturas = await this.prismaService.assinatura.findMany({
            where: {
                codCli: parseInt(codCli),
            },
        });

        const trintaDias = new Date(new Date().setDate(new Date().getDate() + 30));

        return assinaturas.map(assinatura => {
            const status = assinatura.dataUltimoPagamento > trintaDias ? "ATIVO" : "CANCELADO";

            return {
                ...assinatura,
                status,
            };
        });
    }

    async getAssinaturasPlano(codPlano: string) {
        const assinaturas = await this.prismaService.assinatura.findMany({
            where: {
                codPlano: parseInt(codPlano),
            },
        });

        const trintaDias = new Date(new Date().setDate(new Date().getDate() + 30));

        return assinaturas.map(assinatura => {
            const status = assinatura.dataUltimoPagamento > trintaDias ? "ATIVO" : "CANCELADO";
            return {
                ...assinatura,
                status,
            };
        });
    }
}