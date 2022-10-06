module.exports = {
    name: 'Shorten',
    aliases: ['Url'],
    description: 'Shorten long URLs',
    usage: '`-url [link]`',
    async run({ client, message, args, EmbedBuilder }) {
        const hasp = await client.db('taki').collection('premium').findOne({ gid: parseInt(message.guild.id) });
        if (!hasp) return console.log('penis');

        if (!args[0]) return;

        if (args[0].replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, '') !== '') return message.channel.send('Invalid link');

        const embed = new EmbedBuilder()
            .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
            .setTimestamp()
            .setColor('#2E3137')

        fetch(`https://ulvis.net/API/write/get?url=${args[0]}&private=1&type=json`)
            .then((res) => res.json())
            .then((res) => message.channel.send({ embeds: [
                embed
                    .setTitle('Link generated')
                    .setDescription(res.data.url)
            ] }))
            .catch((err) => message.channel.send({ embeds: [
                embed
                    .setTitle('An error occurred')
                    .setDescription(err)
            ] }))
    }
}