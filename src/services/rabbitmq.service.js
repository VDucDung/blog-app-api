const amqp = require('amqplib');

const { rabbitmq, logger } = require('../config');

class RabbitMQClient {
  constructor() {
    this.queueURL = rabbitmq.uri;
    this.connection = null;
    this.channel = null;
  }

  async establishConnection() {
    if (!this.connection) {
      this.connection = await amqp.connect(this.queueURL);
      this.channel = await this.connection.createChannel();
    }
  }

  async sendQueue(queueName, data) {
    try {
      await this.establishConnection();
      await this.channel.assertQueue(queueName, { durable: true });

      this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = new RabbitMQClient();
