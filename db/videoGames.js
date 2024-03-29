const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query('SELECT * FROM videoGames');
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    try {
        const { name, platform, genre } = body;
        const { rows: [videoGame] } = await client.query(`
            INSERT INTO videoGames(name, platform, genre)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, platform, genre]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(', ');

    try {
        if (setString.length === 0) {
            return;
        }

        const { rows: [videoGame] } = await client.query(`
            UPDATE videoGames
            SET ${setString}
            WHERE id = $${Object.keys(fields).length + 1}
            RETURNING *;
        `, [...Object.values(fields), id]);

        return videoGame;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
};
