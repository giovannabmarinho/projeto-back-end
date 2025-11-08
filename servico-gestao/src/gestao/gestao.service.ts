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

        if (tipo === "ATIVO") {
            assinaturas = await this.prismaService.assinatura.findMany({
                where: {
                    dataUltimoPagamento: {
                        gt: new Date(),
                    },
                },
            });
        } else if (tipo === "CANCELADO") {
            assinaturas = await this.prismaService.assinatura.findMany({
                where: {
                    dataUltimoPagamento: {
                        lte: new Date(),
                    },
                },
            });
        } else {
            assinaturas = await this.prismaService.assinatura.findMany();
        }

        return assinaturas.map(assinatura => {
            const status = assinatura.dataUltimoPagamento > new Date() ? "ATIVO" : "CANCELADO";

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


        return assinaturas.map(assinatura => {
            const status = assinatura.dataUltimoPagamento > new Date() ? "ATIVO" : "CANCELADO";

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

        return assinaturas.map(assinatura => {
            const status = assinatura.dataUltimoPagamento > new Date() ? "ATIVO" : "CANCELADO";
            return {
                ...assinatura,
                status,
            };
        });
    }
}