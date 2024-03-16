/*
  Warnings:

  - Added the required column `key` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "key" TEXT NOT NULL;
