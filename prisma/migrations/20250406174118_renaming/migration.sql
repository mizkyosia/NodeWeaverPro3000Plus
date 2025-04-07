/*
  Warnings:

  - You are about to drop the column `public` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Collection` DROP COLUMN `public`,
    ADD COLUMN `visibility` ENUM('PUBLIC', 'RESTRICTED', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC';
