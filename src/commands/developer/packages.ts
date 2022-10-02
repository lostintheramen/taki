const package = require('../../../package.json');

module.exports = {
    name: 'Packages',
    aliases: ['Dependencies', 'Pkg'],
    run({ message, EmbedBuilder }) {
        if (message.author.id !== '999047650911473704') return;

        let str = '';

        for (const entry of Object.entries(package.dependencies)) {
            str += `\`${entry[0]}\`: \`${entry[1]}\`\n`;
        }

        message.channel.send({ embeds: [
            new EmbedBuilder()
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
                .setTitle('Packages')
                .setDescription(str)
                .setTimestamp()
                .setColor('#2E3137')
        ] });
    }
}