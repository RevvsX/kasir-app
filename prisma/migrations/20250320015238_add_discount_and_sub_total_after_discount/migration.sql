/*
  Warnings:

  - Added the required column `discount` to the `TransactionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_total_after_discount` to the `TransactionDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactiondetail` ADD COLUMN `discount` INTEGER NOT NULL,
    ADD COLUMN `sub_total_after_discount` INTEGER NOT NULL;
