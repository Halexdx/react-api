const PhotoShoot = require("../models/PhotoShoot");
const User = require("../models/User");

module.exports = {
    async index(req, res) {
        const { phototype } = req.query;

        const photoshoot = await PhotoShoot.find({ phototype: phototype });

        return res.json(photoshoot);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { photoshoot, packs, price, phototype, name } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'O usuário não existe !' });
        }

        const photoShoot = await PhotoShoot.create({
            user: user_id,
            thumbnail: filename,
            photoshoot,
            phototype,
            name,
            packs: packs.split(',').map(packs => packs.trim()),
            price
        })

        return res.json(photoShoot);
    }
};