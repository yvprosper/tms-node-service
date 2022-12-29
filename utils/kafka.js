const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'node-tms-service',
  brokers: ['localhost:29092'],
})

const produceMessage = async (topic, message) => {
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
    topic: topic,
    messages: [
    { value: message },
        ],
    })
    console.log("successfully sent message to kafka topic")
    await producer.disconnect()
}

const consumeMessage = async (topic, message) => {
    console.log(`kafka is starting...`)
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: JSON.parse(message.value)
        })
    },
    })
    console.log(`kafka is listening for messages`)
}

module.exports = {
    produceMessage,
    consumeMessage
}