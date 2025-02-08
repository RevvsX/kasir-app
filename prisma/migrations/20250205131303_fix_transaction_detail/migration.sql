/*
  Warnings:

  - Added the required column `productId` to the `TransactionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `TransactionDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionDetail" ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
