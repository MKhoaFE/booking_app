// config/redisClient.js
const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://default:Minhkhoa0404.@redis-12768.c124.us-central1-1.gce.redns.redis-cloud.com:12768',
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Kết nối ngay khi import module
(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Failed to connect Redis:", err);
  }
})();

module.exports = redisClient;
