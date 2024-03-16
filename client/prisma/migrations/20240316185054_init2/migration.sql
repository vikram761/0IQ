/*
  Warnings:

  - Added the required column `name` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "name" TEXT NOT NULL;
