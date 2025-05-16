import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";

const plugin: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.get("/", {}, (req) => {
    return { success: true };
  });

  fastify.get("/:id", {}, (req) => {
    return { success: true };
  });

  fastify.post("/", {}, (req) => {
    return { success: true };
  });

  fastify.put("/:id", {}, (req) => {
    return { success: true };
  });
};

export default plugin;
