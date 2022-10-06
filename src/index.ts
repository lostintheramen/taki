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

const Taki = new Client({
    intents: 3276799
});

Taki.on('ready', async () => {
    console.log('✓ :: Online');
});

Taki.commands = new Collection();
Taki.aliases = new Collection();

const folders = fs.readdirSync('./src/commands/');

for (const folder of folders) {
    for (const file of fs.readdirSync(`./src/commands/${folder}/`).filter((file) => file.endsWith('.ts'))) {
        const command = require(`./commands/${folder}/${file}`);
        Taki.commands.set(command.name.toLowerCase(), command);

        command.aliases.forEach((alias) => {
            Taki.aliases.set(alias.toLowerCase(), command);
        });
    }
}

Taki.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const prefix = '-';

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift()?.toLowerCase();

    if (command == 'none') return;

    const cmd = Taki.commands.get(command) || Taki.aliases.get(command);

    cmd?.run({ client, fs, Taki, message, args, EmbedBuilder, PermissionsBitField });
});

Taki.login(process.env.token); 