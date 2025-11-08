import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const temClientes = await prisma.cliente.findMany();
  if (temClientes.length > 0) {
    console.log('Já existem dados cadastrados. Terminando execução do script de seed');
    return;
  }

  await prisma.cliente.createMany({
    data: [
      {
        nome: 'Giovanna Barbosa Marinho',
        email: 'giovannabmarinho@gmail.com',
      },
      {
        nome: 'Ganache',
        email: 'ganache@gato.miau',
      },
      {
        nome: 'Brownie',
        email: 'brownie@gato.miau',
      },
      {
        nome: 'Merengue',
        email: 'merengue@gato.miau',
      },
      {
        nome: 'Carlos Ferreira',
        email: 'carlos.ferreira@email.com',
      },
      {
        nome: 'Juliana Almeida',
        email: 'juliana.almeida@email.com',
      },
      {
        nome: 'Roberto Lima',
        email: 'roberto.lima@email.com',
      },
      {
        nome: 'Fernanda Souza',
        email: 'fernanda.souza@email.com',
      },
      {
        nome: 'Lucas Martins',
        email: 'lucas.martins@email.com',
      },
      {
        nome: 'Patricia Rocha',
        email: 'patricia.rocha@email.com',
      },
    ],
  });

  await prisma.plano.createMany({
    data: [
      {
        nome: 'Plano Básico',
        custoMensal: 29.90,
        descricao: 'Plano básico com recursos essenciais',
      },
      {
        nome: 'Plano Intermediário',
        custoMensal: 59.90,
        descricao: 'Plano intermediário com recursos avançados',
      },
      {
        nome: 'Plano Premium',
        custoMensal: 99.90,
        descricao: 'Plano premium com todos os recursos',
      },
      {
        nome: 'Plano Empresarial',
        custoMensal: 199.90,
        descricao: 'Plano empresarial para grandes empresas',
      },
      {
        nome: 'Plano Familiar',
        custoMensal: 79.90,
        descricao: 'Plano familiar com múltiplos usuários',
      },
    ],
  });

  const clientesCriados = await prisma.cliente.findMany();
  const planosCriados = await prisma.plano.findMany();

  const hoje = new Date();
  const proximosDozeMeses = new Date(hoje);
  proximosDozeMeses.setMonth(proximosDozeMeses.getMonth() + 12);

  await prisma.assinatura.createMany({
    data: [
      {
        codPlano: planosCriados[0].codigo,
        codCli: clientesCriados[0].codigo,
        inicioFidelidade: hoje,
        fimFidelidade: proximosDozeMeses,
        dataUltimoPagamento: hoje,
        custoFinal: planosCriados[0].custoMensal * 12,
        descricao: 'Assinatura anual do plano básico',
      },
      {
        codPlano: planosCriados[1].codigo,
        codCli: clientesCriados[1].codigo,
        inicioFidelidade: hoje,
        fimFidelidade: proximosDozeMeses,
        dataUltimoPagamento: hoje,
        custoFinal: planosCriados[1].custoMensal * 12,
        descricao: 'Assinatura anual do plano intermediário',
      },
      {
        codPlano: planosCriados[2].codigo,
        codCli: clientesCriados[2].codigo,
        inicioFidelidade: hoje,
        fimFidelidade: proximosDozeMeses,
        dataUltimoPagamento: hoje,
        custoFinal: planosCriados[2].custoMensal * 12,
        descricao: 'Assinatura anual do plano premium',
      },
      {
        codPlano: planosCriados[3].codigo,
        codCli: clientesCriados[3].codigo,
        inicioFidelidade: hoje,
        fimFidelidade: proximosDozeMeses,
        dataUltimoPagamento: hoje,
        custoFinal: planosCriados[3].custoMensal * 12,
        descricao: 'Assinatura anual do plano empresarial',
      },
      {
        codPlano: planosCriados[4].codigo,
        codCli: clientesCriados[4].codigo,
        inicioFidelidade: hoje,
        fimFidelidade: proximosDozeMeses,
        dataUltimoPagamento: hoje,
        custoFinal: planosCriados[4].custoMensal * 12,
        descricao: 'Assinatura anual do plano familiar',
      },
    ],
  });

  console.log('Script de seed executado!');
  console.log(`Criados ${clientesCriados.length} clientes`);
  console.log(`Criados ${planosCriados.length} planos`);
  console.log('Criadas 5 assinaturas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

