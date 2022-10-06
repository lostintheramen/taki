module.exports = {
    name: 'Randomdog',
    aliases: ['Dog'],
    description: 'Fetch a random image/video from random.dog',
    usage: '`-dog`',
    run({ message }) {
        fetch('https://random.dog/woof.json')
            .then((res) => res.json())
            .then((res) => message.channel.send(res.url));
    }
}