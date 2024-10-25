import { z } from 'zod';
import { data } from '../../../lib/data';
// /api/songs

const songSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  album: z.string(),
  duration: z.string(),
  genre: z.string().optional(),
});

// GET /api/songs
export async function GET() {
  // return new Response(JSON.stringify(data.songs), {})
  return Response.json(data.songs);
}

// POST /api/songs
export async function POST(req) {
  try {
    const body = await req.json();

    // validate body against schema
    await songSchema.parseAsync(body); // throw new Error

    data.songs.push(body);
    return new Response(null, {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    let error = err;
    if (error instanceof z.ZodError) {
      error = err.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));
      return new Response(JSON.stringify({ errors: error }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(
      JSON.stringify({ error: 'Algo ha fallado. Vuelve a intentarlo.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
