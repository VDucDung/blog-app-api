const rabbitMQConfig = {
  host: process.env.RABBITMQ_HOST,
  vhost: process.env.RABBITMQ_VHOST,
  port: process.env.RABBITMQ_PORT || 5672,
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
  type: process.env.RABBITMQ_TYPE || 'cloud',
};

const { type, host, port, username, password, vhost } = rabbitMQConfig;

let uri;

if (type === 'cloud') {
  uri = `amqps://${username}:${password}@${host}/${vhost}`;
} else {
  uri = `amqp://${username}:${password}@${host}:${port}/${vhost}`;
}

module.exports = {
  uri,
};
