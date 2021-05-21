const { Kafka } = require('kafkajs');
const config = require('./kafkaconfig');
// 1.Instantiating kafka
const kafka = new Kafka(config);
// 2.Creating Kafka Producer
const producer = kafka.producer();

export const runProducer = async () => {
  console.log("aqui eu cheguei")
const message = {
nTransOrderID: 1000,
sTransOrderCode: "TO-101212"
}
// 3.Connecting producer to kafka broker.
await producer.connect()
await producer.send({
topic: 'frames',
messages:
[{ value: JSON.stringify(message) }],
})
}
