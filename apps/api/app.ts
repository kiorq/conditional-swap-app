import cors from "@fastify/cors";
import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import runSwapCron from "./cron/swap_cron";

const PORT = parseInt(process.env.PORT || "3030", 10);

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(cors, {
  origin: true, // allow cors for everyone for testing purposes
});

fastify.ready().then(() => {
  // HACK: scheduler will go here (to not block server startup)
  setInterval(() => {
    runSwapCron();
  }, 10000);
});

fastify.register(require("./domains/swap/routes"), {
  prefix: "/swap_requests",
});

fastify.register(require("./domains/exchange/routes"), {
  prefix: "/exchange",
});

// Start the server
const runServer = async () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

runServer();
