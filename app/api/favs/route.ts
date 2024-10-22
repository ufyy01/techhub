import { connect } from '@/lib/db';
import Fav from '@/lib/Models/fav';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    // const userId = await request.user._id;
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '10');

    page = page ? page : 1;
    limit = limit ? limit : 10;

    const offset = (page - 1) * limit;

    await connect();

    const favs = await Fav.find().skip(offset).limit(limit);
    if (!favs) throw new Error("Can't load favourite hubs");

    const totalFavs = await Fav.countDocuments();

    return NextResponse.json(
      {
        message: 'success',
        data: favs,
        pagination: {
          total: totalFavs,
          page,
          limit,
          pages: Math.ceil(totalFavs / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};
