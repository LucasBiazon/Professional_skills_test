/*
  Warnings:

  - Added the required column `userId` to the `QuestionResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionOption" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "skillTestId" TEXT;

-- AlterTable
ALTER TABLE "QuestionResponse" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_skillTestId_fkey" FOREIGN KEY ("skillTestId") REFERENCES "SkillTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
