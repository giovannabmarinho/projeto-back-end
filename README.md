# Serviço de Gestão

Sistema backend desenvolvido em NestJS para gestão de assinaturas, clientes e planos. O serviço permite gerenciar assinaturas de clientes, controlar planos disponíveis e acompanhar o status das assinaturas (ativas ou canceladas).

## Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para gerenciamento de banco de dados
- **SQLite** - Banco de dados
- **TypeScript** - Linguagem de programação

## Pré-requisitos

- Node.js
- npm

## Instalação

1. Navegue até a pasta do projeto:
```bash
cd servico-gestao
```

2. Instale as dependências:
```bash
npm install
```

## Configuração do Banco de Dados

1. Execute as migrações do Prisma:
```bash
npx prisma migrate deploy
```

2. (Opcional) Popule o banco com dados iniciais:
```bash
npx prisma db seed
```

## Executando o Projeto

### Modo Desenvolvimento
```bash
npm run start:dev
```

### Modo Produção
```bash
npm run build
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints da API

- `GET /gestao/clientes` - Lista todos os clientes
- `GET /gestao/planos` - Lista todos os planos
- `POST /gestao/assinaturas` - Cria uma nova assinatura
- `PATCH /gestao/planos/:idPlano` - Atualiza o custo mensal de um plano
- `GET /gestao/assinaturas/:tipo` - Lista assinaturas por tipo (ATIVOS ou CANCELADOS)
- `GET /gestao/assinaturascliente/:codCli` - Lista assinaturas de um cliente
- `GET /gestao/assinaturasplano/:codPlano` - Lista assinaturas de um plano


