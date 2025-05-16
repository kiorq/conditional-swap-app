import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const plugin: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.get("/currencies", async (req) => {
    return { success: true, currencies: ["eth", "btc", "usdt", "usdc"] };
  });
};

export default plugin;
