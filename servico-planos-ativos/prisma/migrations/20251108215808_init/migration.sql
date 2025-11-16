-- CreateTable
CREATE TABLE "Plano" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "custoMensal" REAL NOT NULL,
    "data" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codPlano" INTEGER NOT NULL,
    "codCli" INTEGER NOT NULL,
    "inicioFidelidade" DATETIME NOT NULL,
    "fimFidelidade" DATETIME NOT NULL,
    "dataUltimoPagamento" DATETIME NOT NULL,
    "custoFinal" REAL NOT NULL,
    "descricao" TEXT,
    CONSTRAINT "Assinatura_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "Cliente" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assinatura_codPlano_fkey" FOREIGN KEY ("codPlano") REFERENCES "Plano" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codAss" INTEGER NOT NULL,
    "valorPago" REAL NOT NULL,
    "dataPagamento" DATETIME NOT NULL,
    CONSTRAINT "Pagamento_codAss_fkey" FOREIGN KEY ("codAss") REFERENCES "Assinatura" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
