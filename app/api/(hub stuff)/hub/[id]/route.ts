import { connect } from '@/lib/db';
import Hub from '@/lib/Models/hub';
import { getLocation } from '@/lib/utils';
import { NextResponse } from 'next/server';

export const maxDuration = 5; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

//Update hub
export const PATCH = async (request: Request, context: { params: any }) => {
  try {
    const id = context.params.id;
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { message: 'update Hub information' },
        { status: 400 }
      );
    }
    await connect();
    const hub = await Hub.findById(id);
    if (!hub) throw new Error('Hub does not exist');

    let lat: number | undefined;
    let lng: number | undefined;

    let geoLocation = await getLocation(body.address);
    if (geoLocation.error) {
      return NextResponse.json(
        {
          message: 'Location not found, Please enter a valid location',
        },
        { status: 400 }
      );
    }

    if (geoLocation.coordinates) {
      ({ lat, lng } = geoLocation.coordinates);
    }

    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
    const newhub = await Hub.findByIdAndUpdate(id, {
      ...body,
      location,
    });

    await newhub.save();

    return NextResponse.json(
      { message: 'Hub updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};

//Delete hub
export const DELETE = async (request: Request, context: { params: any }) => {
  const id = context.params.id;

  try {
    await connect();
    const hub = await Hub.findByIdAndDelete(id);
    if (!hub) throw new Error('Hub does not exist');

    return NextResponse.json(
      { message: 'Hub deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};

//get hub
export const GET = async (request: Request, context: { params: any }) => {
  const id = context.params.id;
  try {
    await connect();
    const hub = await Hub.findById(id);
    if (!hub) throw new Error('Hub does not exist');

    return NextResponse.json(
      { message: 'success', data: hub },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};
