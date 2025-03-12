/*
  Warnings:

  - Added the required column `fixed_total_price` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppn` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `fixed_total_price` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `ppn` DECIMAL(65, 30) NOT NULL;
