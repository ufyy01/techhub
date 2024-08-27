import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import { SortOrder } from 'mongoose';
import { getLocation } from '@/lib/utils';
import Hub from '@/lib/Models/hub';

//get all hubs
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    let sort = searchParams.get('sort');
    let order = searchParams.get('order');
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '10');
    let searchKeywords = searchParams.get('search');

    sort = sort || 'name';
    order = order || 'asc';
    page = page ? page : 1;
    limit = limit ? limit : 10;

    if (!['asc', 'desc'].includes(order)) {
      return NextResponse.json(
        JSON.stringify({
          message: "Invalid order value. Must be 'asc' or 'desc'.",
        }),
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    await connect();

    const sortObj: { [key: string]: SortOrder } = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const hubs = await Hub.find().sort(sortObj).skip(offset).limit(limit);
    if (!hubs) throw new Error("Can't load hubs");

    const totalStores = await Hub.countDocuments();

    return NextResponse.json(
      JSON.stringify({
        message: 'success',
        data: hubs,
        pagination: {
          total: totalStores,
          page,
          limit,
          pages: Math.ceil(totalStores / limit),
        },
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};

//create a hub
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    if (!body) {
      return NextResponse.json(
        JSON.stringify({ message: 'No data provided' }),
        { status: 400 }
      );
    }

    const hub = await Hub.findOne({ name: body.name });
    if (hub) {
      return NextResponse.json(
        JSON.stringify({
          message: 'Hub with this name already exists',
        }),
        { status: 400 }
      );
    }

    const hubEmail = await Hub.findOne({ name: body.email });
    if (hubEmail) {
      return NextResponse.json(
        JSON.stringify({
          message: 'Hub with this email already exists',
        }),
        { status: 400 }
      );
    }

    let geoLocation = await getLocation(body.address);
    if (!geoLocation) {
      return NextResponse.json(
        JSON.stringify({
          message: 'Location not found, Please enter a valid location',
        }),
        { status: 400 }
      );
    }

    const { lat, lng } = geoLocation;

    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    await Hub.create({ ...body, location });

    return NextResponse.json(
      JSON.stringify({ message: 'Hub created successfully' }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};
