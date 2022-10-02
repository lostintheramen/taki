module.exports = {
    name: 'Kick',
    aliases: ['K'],
    async run({ message, args, EmbedBuilder, PermissionsBitField }) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return;

        if (!args[1]) return;

        const target = message.mentions.members.first();
        if (!target) return;

        if (target.roles.highest.position > message.member.roles.highest.position) return message.channel.send(`You do not have permission to kick ${target.username}`);
        if (!target.kickable) return message.channel.send(`I do not have permission to kick ${target.username}`);
    
        try {
            await target.send({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
                    .setTitle('Kick')
                    .setDescription(`You have been kicked from ${message.guild.name}\nReason: ${`'${args[1]}'` || 'No reason specified'}`)
                    .setTimestamp()
                    .setColor('#2E3137')
            ] });
        } catch {
            return true;
        }
        
        target.kick({ reason: args.slice(1).join(' ') || 'No reason specified' });
    }
}