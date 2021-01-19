const PhotoShoot = require("../models/PhotoShoot");

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;

        const photoshoot = await PhotoShoot.find({ user: user_id });

        return res.json(photoshoot);
    }
}