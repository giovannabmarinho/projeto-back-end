/*
  Warnings:

  - Made the column `descricao` on table `Assinatura` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assinatura" (
    "codigo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codPlano" INTEGER NOT NULL,
    "codCli" INTEGER NOT NULL,
    "inicioFidelidade" DATETIME NOT NULL,
    "fimFidelidade" DATETIME NOT NULL,
    "dataUltimoPagamento" DATETIME NOT NULL,
    "custoFinal" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "Assinatura_codCli_fkey" FOREIGN KEY ("codCli") REFERENCES "Cliente" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assinatura_codPlano_fkey" FOREIGN KEY ("codPlano") REFERENCES "Plano" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assinatura" ("codCli", "codPlano", "codigo", "custoFinal", "dataUltimoPagamento", "descricao", "fimFidelidade", "inicioFidelidade") SELECT "codCli", "codPlano", "codigo", "custoFinal", "dataUltimoPagamento", "descricao", "fimFidelidade", "inicioFidelidade" FROM "Assinatura";
DROP TABLE "Assinatura";
ALTER TABLE "new_Assinatura" RENAME TO "Assinatura";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
