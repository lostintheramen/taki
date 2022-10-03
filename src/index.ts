require('dotenv').config();

const { Client, Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

const Kaede = new Client({
    intents: 3276799
});

Kaede.on('ready', () => {
    console.info('✓ :: Online');
});

Kaede.commands = new Collection();
Kaede.aliases = new Collection();

const folders = fs.readdirSync('./src/commands/');

for (const folder of folders) {
    for (const file of fs.readdirSync(`./src/commands/${folder}/`).filter((file) => file.endsWith('.ts'))) {
        const command = require(`./commands/${folder}/${file}`);
        Kaede.commands.set(command.name.toLowerCase(), command);

        command.aliases.forEach((alias) => {
            Kaede.aliases.set(alias.toLowerCase(), command);
        });
    }
}

Kaede.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const prefix = '-';

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift()?.toLowerCase();

    const cmd = Kaede.commands.get(command) || Kaede.aliases.get(command);

    cmd?.run({ fs, Kaede, message, args, EmbedBuilder, PermissionsBitField });
});

Kaede.login(process.env.token);