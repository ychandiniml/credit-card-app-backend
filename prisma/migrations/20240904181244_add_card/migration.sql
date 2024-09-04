-- CreateTable
CREATE TABLE "cards" (
    "card_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "bank_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "cards_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks" ("bank_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
