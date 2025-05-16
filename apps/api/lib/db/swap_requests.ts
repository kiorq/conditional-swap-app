import { db } from "./index";
import { swapRequests } from "./schema";
import { eq, and, gte, lte, desc } from "drizzle-orm";
import { SwapRequestStatus } from "../../domains/swap/models";
import { SQL } from "drizzle-orm";

// Create a new swap request
export async function createSwapRequest(data: {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  minThreshold: number;
  startDate: Date;
  endDate: Date;
}) {
  const [request] = await db
    .insert(swapRequests)
    .values({
      fromToken: data.fromToken,
      toToken: data.toToken,
      fromAmount: data.fromAmount,
      toAmount: data.toAmount,
      minThreshold: data.minThreshold,
      startDate: data.startDate,
      endDate: data.endDate,
      status: SwapRequestStatus.PENDING,
    } as typeof swapRequests.$inferInsert)
    .returning();
  return request;
}

// Get a swap request by ID
export async function getSwapRequest(id: string) {
  const [request] = await db
    .select()
    .from(swapRequests)
    .where(eq(swapRequests.id, id));
  return request;
}

// Get all swap requests with optional filters
export async function getSwapRequests(filters?: {
  status?: SwapRequestStatus;
  fromToken?: string;
  toToken?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const query = db.select().from(swapRequests);

  if (filters) {
    const conditions: SQL[] = [];

    if (filters.status) {
      conditions.push(eq(swapRequests.status, filters.status));
    }
    if (filters.fromToken) {
      conditions.push(eq(swapRequests.fromToken, filters.fromToken));
    }
    if (filters.toToken) {
      conditions.push(eq(swapRequests.toToken, filters.toToken));
    }
    if (filters.startDate) {
      conditions.push(gte(swapRequests.startDate, filters.startDate));
    }
    if (filters.endDate) {
      conditions.push(lte(swapRequests.endDate, filters.endDate));
    }

    if (conditions.length > 0) {
      return query
        .where(and(...conditions))
        .orderBy(desc(swapRequests.endDate));
    }
  }

  return query.orderBy(desc(swapRequests.endDate));
}

// Update a swap request
export async function updateSwapRequest(
  id: string,
  data: Partial<{
    status: SwapRequestStatus;
    fromAmount: number;
    toAmount: number;
    minThreshold: number;
    startDate: Date;
    endDate: Date;
  }>
) {
  const updateData: Record<string, unknown> = {
    ...data,
    updatedAt: new Date(),
  };

  if (data.startDate) {
    updateData.startDate = data.startDate;
  }
  if (data.endDate) {
    updateData.endDate = data.endDate;
  }

  const [request] = await db
    .update(swapRequests)
    .set(updateData)
    .where(eq(swapRequests.id, id))
    .returning();
  return request;
}

// Delete a swap request
export async function deleteSwapRequest(id: string) {
  const [request] = await db
    .delete(swapRequests)
    .where(eq(swapRequests.id, id))
    .returning();
  return request;
}

// Get pending swap requests
export async function getPendingSwapRequests() {
  return db
    .select()
    .from(swapRequests)
    .where(eq(swapRequests.status, SwapRequestStatus.PENDING));
}

// Update swap request status
export async function updateSwapRequestStatus(
  id: string,
  status: SwapRequestStatus
) {
  const [request] = await db
    .update(swapRequests)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(swapRequests.id, id))
    .returning();
  return request;
}
