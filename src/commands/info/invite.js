module.exports = {
    name: 'Invite',
    aliases: ['None'],
    description: 'Get the invite link for this bot',
    usage: '`-invite`',
    run({ message, EmbedBuilder }) {
        message.channel.send({ embeds: [
            new EmbedBuilder()
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                .setDescription('[**Invite Taki**](https://discord.com/api/oauth2/authorize?client_id=1026099825437048832&permissions=8&scope=bot)')
                .setTimestamp()
                .setColor('#2E3137')
        ] })
    }
}