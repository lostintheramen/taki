module.exports = {
    name: 'Eval',
    aliases: ['Run'],
    description: 'Run any code fed into this command',
    usage: '`-run (code)`',
    run({ Kaede, message, args, EmbedBuilder, PermissionsBitField }) {
        if (message.author.id !== '999047650911473704') return;

        eval(args.join(' '));
    }
}