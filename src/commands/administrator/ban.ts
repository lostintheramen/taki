module.exports = {
    name: 'Ban',
    aliases: ['B'],
    async run({ message, args, EmbedBuilder, PermissionsBitField }) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return;

        if (!args[1]) return;

        const target = message.mentions.members.first();
        if (!target) return;

        if (target.roles.highest.position > message.member.roles.highest.position) return message.channel.send(`You do not have permission to ban ${target.username}`);
        if (!target.bannable) return message.channel.send(`I do not have permission to ban ${target.username}`);
    
        try {
            await target.send({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
                    .setTitle('Ban')
                    .setDescription(`You have been banned from ${message.guild.name}\nReason: ${`'${args[1]}'` || 'No reason specified'}`)
                    .setTimestamp()
                    .setColor('#2E3137')
            ] });
        } catch {
            return true;
        }
        
        target.ban({ reason: args.slice(1).join(' ') || 'No reason specified', days: 3 });
    }
}