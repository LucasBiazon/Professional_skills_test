/*
  Warnings:

  - You are about to drop the column `skillTestId` on the `QuestionOption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionOption" DROP CONSTRAINT "QuestionOption_skillTestId_fkey";

-- AlterTable
ALTER TABLE "QuestionOption" DROP COLUMN "skillTestId";
