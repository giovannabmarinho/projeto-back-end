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

## Configuração e Execução do Projeto

Abra 4 terminais diferentes, um para cada microsserviço + api gateway

### No primeiro terminal:
1. Navegue até a pasta do projeto:
```bash
cd servico-gestao
```

2. Instale as dependências:
```bash
npm install
```

3. Execute as migrações do Prisma:
```bash
npx prisma migrate deploy
```

4. (Opcional) Popule o banco com dados iniciais:
```bash
npx prisma db seed
```

5. Rode o serviço
```bash
npm run start:dev
```

### No segundo terminal:
1. Navegue até a pasta do projeto:
```bash
cd servico-planos-ativos
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o serviço
```bash
npm run start:dev
```

### No terceiro terminal:
1. Navegue até a pasta do projeto:
```bash
cd servico-faturamento
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o serviço
```bash
npm run start:dev
```

### No quarto terminal:
1. Navegue até a pasta do projeto:
```bash
cd api-gateway
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o serviço
```bash
npm run start:dev
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


