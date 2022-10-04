module.exports = {
    name: 'Ping',
    aliases: ['Latency'],
    description: 'See the bot client & Discord API ping',
    usage: '`-ping`',
    run({ Kaede, message, EmbedBuilder, PermissionsBitField }) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

        message.channel.send('Loading...').then((msg) => {
            msg.edit({ 
                content: 'Done!',    
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                        .setTitle('Ping')
                        .setDescription(`Client latency: ${Kaede.ws.ping}\nAPI latency: ${msg.createdTimestamp - message.createdTimestamp}`)
                        .setTimestamp()
                        .setColor('#2E3137')
                ]
            });
        });
    }
}