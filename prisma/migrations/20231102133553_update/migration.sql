/*
  Warnings:

  - You are about to drop the column `descriptions` on the `bookmarks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "descriptions",
ADD COLUMN     "description" TEXT;
