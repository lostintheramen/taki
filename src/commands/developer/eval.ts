module.exports = {
    name: 'Eval',
    aliases: ['Run'],
    run({ Kaede, message, args, EmbedBuilder, PermissionsBitField }) {
        if (message.author.id !== '999047650911473704') return;

        eval(args.join(' '));
    }
}