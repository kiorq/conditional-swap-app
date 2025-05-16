import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import {
  getSwapRequests,
  getSwapRequest,
  createSwapRequest,
  updateSwapRequest,
} from "../../lib/db/swap_requests";
import { SwapRequestStatus } from "./models";

type GetSwapRequestParams = {
  Params: {
    id: string;
  };
};

type CreateSwapRequestBody = {
  Body: {
    fromToken: string;
    toToken: string;
    fromAmount: number;
    toAmount: number;
    minThreshold: number;
    startDate: string;
    endDate: string;
  };
};

type UpdateSwapRequestParams = {
  Params: {
    id: string;
  };
  Body: {
    status: SwapRequestStatus;
    fromAmount: number;
    toAmount: number;
    minThreshold: number;
    startDate: string;
    endDate: string;
  };
};

const plugin: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.get("/", async (req) => {
    const swapRequests = await getSwapRequests();
    return { success: true, swap_requests: swapRequests };
  });

  fastify.get<GetSwapRequestParams>(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
    async (req) => {
      const swapRequest = await getSwapRequest(req.params.id);
      return { success: true, swap_request: swapRequest };
    }
  );

  fastify.post<CreateSwapRequestBody>(
    "/",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            fromToken: { type: "string" },
            toToken: { type: "string" },
            fromAmount: { type: "number" },
            toAmount: { type: "number" },
            minThreshold: { type: "number" },
            startDate: { type: "string" },
            endDate: { type: "string" },
          },
        },
      },
    },
    async (req) => {
      const createdSwapRequest = await createSwapRequest({
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      });
      return { success: true, swap_request: createdSwapRequest };
    }
  );

  fastify.put<UpdateSwapRequestParams>(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            status: { type: "string" },
            fromAmount: { type: "number" },
            toAmount: { type: "number" },
            minThreshold: { type: "number" },
            startDate: { type: "string" },
            endDate: { type: "string" },
          },
        },
      },
    },
    async (req) => {
      const updatedSwapRequest = await updateSwapRequest(req.params.id, {
        ...req.body,
        startDate: req.body.startDate
          ? new Date(req.body.startDate)
          : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      });
      return { success: true, swap_request: updatedSwapRequest };
    }
  );
};

export default plugin;
