/*
  Warnings:

  - You are about to drop the column `CorrectResponse` on the `Question` table. All the data in the column will be lost.
  - Added the required column `correctResponse` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "CorrectResponse",
ADD COLUMN     "correctResponse" TEXT NOT NULL;
