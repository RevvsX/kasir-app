/*
  Warnings:

  - Added the required column `productId` to the `SeasonalDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seasonaldiscount` ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SeasonalDiscount` ADD CONSTRAINT `SeasonalDiscount_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
