import { createClient } from "redis";
import CONFIG from "../config";
import RedisStore from "connect-redis";

/**
 * Configura la conexión con Redis...
 */
export const redisClient = createClient({ url: CONFIG.REDIS_URL });
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({ client: redisClient });

export default redisStore;
