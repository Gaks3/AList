/*
  Warnings:

  - Added the required column `rewatch` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collection` ADD COLUMN `rewatch` INTEGER NOT NULL;
