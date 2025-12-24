const amqp = require('amqplib');
const nodemailer = require('nodemailer');

class ConsumerService {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen() {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:playlists', { durable: true });

    channel.consume('export:playlists', async (message) => {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
        const playlist = await this._playlistsService.getSongsFromPlaylist(playlistId);
        await this._mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }));
        
        channel.ack(message);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

module.exports = ConsumerService;