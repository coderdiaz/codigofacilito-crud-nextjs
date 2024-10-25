import { data } from '../../../../lib/data';
// GET /api/songs/:id

// SELECT * FROM songs WHERE id = $1
const getSongById = (id) => {
  return data.songs.find((song) => {
    return song.id.toString() === id;
  });
};

export async function GET(request, context) {
  const id = context.params.id;
  console.log(id);

  // Find the song by id
  const song = getSongById(id);

  if (!song) {
    return new Response(null, {
      status: 404,
    });
  }

  return new Response(JSON.stringify(song), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
