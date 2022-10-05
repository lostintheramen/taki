require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.uri);

async function connectMongo() {
    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    }
}

connectMongo().catch(console.error);

const { Client, Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

const Kaede = new Client({
    intents: 3276799
});

Kaede.on('ready', async () => {
    console.log('✓ :: Online');
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
    console.table(Kaede.commands, Kaede.aliases);

    if (message.author.bot || !message.guild) return;

    const prefix = '-';

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift()?.toLowerCase();

    if (command == 'none') return;

    const cmd = Kaede.commands.get(command) || Kaede.aliases.get(command);

    cmd?.run({ client, fs, Kaede, message, args, EmbedBuilder, PermissionsBitField });
});

Kaede.login(process.env.token);