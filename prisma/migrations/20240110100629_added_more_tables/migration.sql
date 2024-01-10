-- DropForeignKey
ALTER TABLE "Charts" DROP CONSTRAINT "Charts_id_fkey";

-- AlterTable
ALTER TABLE "Charts" ADD COLUMN     "dashboardsId" TEXT;

-- CreateTable
CREATE TABLE "T1Customers" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "email" TEXT,

    CONSTRAINT "T1Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "T1Products" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "T1Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "T1Transactions" (
    "id" SERIAL NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "gross_sales_volume" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "T1Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_dashboardsId_fkey" FOREIGN KEY ("dashboardsId") REFERENCES "Dashboards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1Transactions" ADD CONSTRAINT "T1Transactions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "T1Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1Transactions" ADD CONSTRAINT "T1Transactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "T1Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
