module.exports = {
    name: 'Help',
    aliases: ['Commands'],
    description: 'Get information about any command',
    run({ fs, Kaede, message, args, EmbedBuilder }) {
        const commandFolders = fs.readdirSync('./src/commands/');

        let sections = [''];

        if(!args[0]) {
            for (const folder of commandFolders) {
                sections = [...sections, `\n- **${folder}**`];
            }
            
            return message.channel.send({embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: message.author.username.toLowerCase(), iconURL: message.author.avatarURL() })
                    .setTimestamp()
                    .setColor('#2F3136')
                    .setTitle('Help sections')
                    .setDescription(sections.join(''))
            ]});
        }
    

    
        if(args) {
            for (const folder of commandFolders) {
                for (const file of fs.readdirSync(`./src/commands/${folder}/`).filter((file) => file.endsWith('.ts'))) {
                    const commandFile = require(`../${folder}/${file}`);
                    if(commandFile == Kaede.commands.get(args[0].toLowerCase()) || commandFile == Kaede.aliases.get(args[0].toLowerCase())) {

            
                        return message.channel.send({embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: message.author.username.toLowerCase(), iconURL: message.author.avatarURL() })
                                .setTimestamp()
                                .setColor('#2F3136')
                                .setTitle(commandFile.name)
                                .setDescription(`Aliases: ${commandFile.aliases.join(', ')}`)
                        ]});
                    }
                }

                if(args[0].toLowerCase() == folder.toLowerCase()) {
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: message.author.username.toLowerCase(), iconURL: message.author.avatarURL() })
                        .setTimestamp()
                        .setColor('#2F3136');

                    for (const file of fs.readdirSync(`./src/commands/${folder}/`).filter((file) => file.endsWith('.ts'))) {
                        const commandFile = require(`../${folder}/${file}`);

                        embed
                            .setTitle(`${folder} commands`)
                            .addFields({ name: `${commandFile.name}`, value: `${commandFile.description}\n` })
                    }
                    return message.channel.send({embeds: [embed]});
                } else {
                    continue;
                }
            }
            message.channel.send('Invalid argument')
        }
    }
}