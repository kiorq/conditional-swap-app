import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const plugin: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.get("/currencies", async (req) => {
    return {
      success: true,
      currencies: {
        eth: 19.12,
        btc: 19.12,
        usdt: 19.12,
        usdc: 19.12,
      },
    };
  });
};
export default plugin;
