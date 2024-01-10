-- CreateEnum
CREATE TYPE "ChartType" AS ENUM ('Line', 'Bar');

-- CreateTable
CREATE TABLE "Charts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "chartType" "ChartType" NOT NULL DEFAULT 'Line',
    "sqlQuery" TEXT NOT NULL DEFAULT '',
    "xAxisField" TEXT NOT NULL DEFAULT '',
    "yAxisField" TEXT NOT NULL DEFAULT '',
    "dateField_table" TEXT NOT NULL DEFAULT '',
    "dateField_field" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Charts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Charts" ADD CONSTRAINT "Charts_id_fkey" FOREIGN KEY ("id") REFERENCES "Dashboards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
