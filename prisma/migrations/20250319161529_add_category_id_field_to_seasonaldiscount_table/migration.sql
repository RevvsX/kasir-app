/*
  Warnings:

  - Added the required column `categoryId` to the `SeasonalDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seasonaldiscount` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SeasonalDiscount` ADD CONSTRAINT `SeasonalDiscount_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
