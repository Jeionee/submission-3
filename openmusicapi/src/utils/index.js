const mapDBToModel = ({ id, name, year }) => ({
    id,
    name,
    year,
});

const mapDBSongs = ({
    id, title, year, performer, genre, duration, album_id,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId: album_id,
});

module.exports = { mapDBToModel, mapDBSongs };