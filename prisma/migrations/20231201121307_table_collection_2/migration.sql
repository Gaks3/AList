/*
  Warnings:

  - Added the required column `image` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collection` ADD COLUMN `add_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `complete_date` DATETIME(3) NULL,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `episode` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
