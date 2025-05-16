import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";


const PORT = parseInt(process.env.PORT || "3030", 10);

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.ready().then(() => {
  // TODO: scheduler will go here
});

fastify.register(require("./routes/swap_requests"), {
  prefix: "/swap_requests",
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
