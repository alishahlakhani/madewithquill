/*
  Warnings:

  - You are about to drop the column `dashboardsId` on the `Charts` table. All the data in the column will be lost.
  - The primary key for the `T1Customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customer_id` on the `T1Customers` table. All the data in the column will be lost.
  - The primary key for the `T1Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_name` on the `T1Products` table. All the data in the column will be lost.
  - The primary key for the `T1Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `transaction_date` on the `T1Transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Charts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Dashboards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `T1Customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `T1Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `T1Transactions` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `T1Customers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Charts" DROP CONSTRAINT "Charts_dashboardsId_fkey";

-- DropForeignKey
ALTER TABLE "T1Transactions" DROP CONSTRAINT "T1Transactions_customerId_fkey";

-- DropForeignKey
ALTER TABLE "T1Transactions" DROP CONSTRAINT "T1Transactions_productId_fkey";

-- AlterTable
ALTER TABLE "Charts" DROP COLUMN "dashboardsId",
ADD COLUMN     "dashboardId" TEXT;

-- AlterTable
ALTER TABLE "T1Customers" DROP CONSTRAINT "T1Customers_pkey",
DROP COLUMN "customer_id",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
ADD CONSTRAINT "T1Customers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "T1Customers_id_seq";

-- AlterTable
ALTER TABLE "T1Products" DROP CONSTRAINT "T1Products_pkey",
DROP COLUMN "product_name",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DEFAULT 0,
ADD CONSTRAINT "T1Products_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "T1Products_id_seq";

-- AlterTable
ALTER TABLE "T1Transactions" DROP CONSTRAINT "T1Transactions_pkey",
DROP COLUMN "transaction_date",
ADD COLUMN     "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "gross_sales_volume" SET DEFAULT 0,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "T1Transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "T1Transactions_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Charts_id_key" ON "Charts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dashboards_id_key" ON "Dashboards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "T1Customers_id_key" ON "T1Customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "T1Products_id_key" ON "T1Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "T1Transactions_id_key" ON "T1Transactions"("id");

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1Transactions" ADD CONSTRAINT "T1Transactions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "T1Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1Transactions" ADD CONSTRAINT "T1Transactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "T1Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
