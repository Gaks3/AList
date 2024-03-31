/*
  Warnings:

  - You are about to drop the column `completed` on the `collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `collection` DROP COLUMN `completed`,
    ADD COLUMN `status` ENUM('WATCHING', 'PLAN', 'COMPLETED', 'HOLD', 'DROPPED') NOT NULL DEFAULT 'WATCHING';
