/*
  Warnings:

  - Added the required column `minimal_purchase_price` to the `SeasonalDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seasonaldiscount` ADD COLUMN `minimal_purchase_price` DECIMAL(65, 30) NOT NULL;
