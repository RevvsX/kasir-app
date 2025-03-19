/*
  Warnings:

  - You are about to drop the column `productId` on the `seasonaldiscount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `seasonaldiscount` DROP FOREIGN KEY `SeasonalDiscount_productId_fkey`;

-- DropIndex
DROP INDEX `SeasonalDiscount_productId_fkey` ON `seasonaldiscount`;

-- AlterTable
ALTER TABLE `seasonaldiscount` DROP COLUMN `productId`;
