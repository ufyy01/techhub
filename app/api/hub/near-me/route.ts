import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import Hub from '@/lib/Models/hub';

//get hubs near a specific location
export const GET = async (request: Request) => {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const lng = searchParams.get('lng');
    const lat = searchParams.get('lat');

    if (typeof lng !== 'string' || typeof lat !== 'string')
      throw new Error('Coordinates must be a string');

    const hubsNear = await Hub.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          key: 'location',
          maxDistance: 1000 * 15,
          distanceField: 'dist.calculated',
          spherical: true,
        },
      },
    ]);
    return NextResponse.json(
      JSON.stringify({
        message: 'Hub near you fetched successfully',
        data: hubsNear,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 200,
    });
  }
};
