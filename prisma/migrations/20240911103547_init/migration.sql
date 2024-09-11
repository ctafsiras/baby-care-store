-- CreateTable
CREATE TABLE "BCS_Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCS_Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCS_Orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCS_OrderItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BCS_Users_email_key" ON "BCS_Users"("email");

-- AddForeignKey
ALTER TABLE "BCS_Orders" ADD CONSTRAINT "BCS_Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BCS_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BCS_OrderItems" ADD CONSTRAINT "BCS_OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "BCS_Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BCS_OrderItems" ADD CONSTRAINT "BCS_OrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "BCS_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
