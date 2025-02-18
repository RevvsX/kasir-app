-- AlterTable
ALTER TABLE `category` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `member` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `transactiondetail` MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `updated_at` DATETIME(3) NULL;
