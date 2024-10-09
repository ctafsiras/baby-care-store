-- CreateTable
CREATE TABLE "BCS_Reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCS_OrderFeedbacks" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_OrderFeedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCS_DeliveryAddresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BCS_DeliveryAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BCS_Reviews_userId_productId_key" ON "BCS_Reviews"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "BCS_OrderFeedbacks_orderId_key" ON "BCS_OrderFeedbacks"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "BCS_OrderFeedbacks_orderId_userId_key" ON "BCS_OrderFeedbacks"("orderId", "userId");

-- AddForeignKey
ALTER TABLE "BCS_Reviews" ADD CONSTRAINT "BCS_Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BCS_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BCS_Reviews" ADD CONSTRAINT "BCS_Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "BCS_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BCS_OrderFeedbacks" ADD CONSTRAINT "BCS_OrderFeedbacks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "BCS_Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BCS_OrderFeedbacks" ADD CONSTRAINT "BCS_OrderFeedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BCS_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BCS_DeliveryAddresses" ADD CONSTRAINT "BCS_DeliveryAddresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "BCS_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
