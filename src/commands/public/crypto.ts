const currencies = require('../../data/currencies.json');

module.exports = {
    name: 'Crypto',
    aliases: ['None'],
    description: 'See the current status of any Cryptocurrency',
    run({ message, args, EmbedBuilder }) {
        if (!args[0]) return message.channel.send({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: message.author.username.toLowerCase(), iconURL: message.author.avatarURL() })
                .setTimestamp()
                .setColor('#2F3136')
                .setTitle('Crypto')
                .setDescription(`\`${currencies.list.join('`, `')}\``)
        ]});

        if (!currencies.list.includes(args[0].toLowerCase())) return message.channel.send(`Error getting details of \`${args[0]}\``);

        try {
            fetch(`https://api.coincap.io/v2/assets/${args[0]}`)
                .then((res) => res.json())
                .then((res) => {
                    return message.channel.send({ embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: message.author.username.toLowerCase(), iconURL: message.author.avatarURL() })
                            .setTimestamp()
                            .setColor('#2F3136')
                            .setTitle(`${res.data.name} (${res.data.symbol})`)
                            .setDescription(`Current value: $${res.data.priceUsd.slice(0, -14)}\nDifference (24H): ${res.data.changePercent24Hr.includes('-') ? `${res.data.changePercent24Hr.slice(0, -14)}%` : `+${res.data.changePercent24Hr.slice(0, -14)}%`}\nVolume-weighted average price: ${res.data.vwap24Hr.slice(0, -14)}\nMarket cap rank: ${res.data.rank}\n[Explorer](${res.data.explorer})`)
                    ]});
                })
        } catch {
            return message.channel.send(`Error getting details of \`${args[0]}\``)
        }
    }
}