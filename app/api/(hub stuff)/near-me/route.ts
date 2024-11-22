import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import Hub from '@/lib/Models/hub';

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

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
          maxDistance: 1000 * 10, // 10 kilometers or 10,000 meters
          distanceField: 'dist.calculated',
          spherical: true,
        },
      },
    ]);
    return NextResponse.json(
      {
        message: 'Hub near you fetched successfully',
        data: hubsNear,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 200,
    });
  }
};
