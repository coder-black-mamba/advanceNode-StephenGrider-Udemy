// Basic Redis Command



const  {createClient } = require('redis');

const client = createClient()
const redisUrl = 'redis://127.0.0.1:6379'
client.on('error', (err) => console.log('Redis Client Error', err))

client.set('key', 'value');
client.hset('name', 'daye', 'hab');
client.hget('name', 'daye', console.log);
client.hgetall('name', console.log);
client.hgetall('name', (err, result) => {
    console.log(result);
})
client.get('key',console.log)
client.quit();