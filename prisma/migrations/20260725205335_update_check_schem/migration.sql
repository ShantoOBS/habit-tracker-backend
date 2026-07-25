-- AlterTable
ALTER TABLE "check_in" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "date" SET DATA TYPE TEXT;
