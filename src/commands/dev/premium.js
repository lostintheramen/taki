module.exports = {
    name: 'Premium',
    aliases: ['None'],
    description: 'Give a server access to premium commands (beta)',
    usage: '`-premium [id]`',
    async run({ client, message, args }) {
        if (message.author.id !== '999047650911473704') return;

        if (!args[0]) return;
        if (isNaN(args[0])) return;
        if (args[0].length != 18 && args[0].length != 19) return;
        
        if(await client.db('taki').collection('premium').findOne({ gid: parseInt(args[0]) })) return;
        
        await client.db('taki').collection('premium').insertOne({ gid: parseInt(args[0]) });
    }
}