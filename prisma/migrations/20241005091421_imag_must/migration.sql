/*
  Warnings:

  - Made the column `image` on table `BCS_Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BCS_Products" ALTER COLUMN "image" SET NOT NULL;
