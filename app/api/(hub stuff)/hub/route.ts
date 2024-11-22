import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import { SortOrder } from 'mongoose';
import { getLocation, verfyEmail } from '@/lib/utils';
import Hub from '@/lib/Models/hub';

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

//get all hubs
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    let sort = searchParams.get('sort');
    let order = searchParams.get('order');
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '24');
    let keywords = searchParams.get('search');
    let letter = searchParams.get('letter');

    sort = sort || 'name';
    order = order || 'asc';
    page = page ? page : 1;
    limit = limit ? limit : 24;
    keywords = keywords ? keywords.toLowerCase() : '';
    letter = letter ? letter.toString() : '';

    if (!['asc', 'desc'].includes(order)) {
      return NextResponse.json(
        {
          message: "Invalid order value. Must be 'asc' or 'desc'.",
        },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    await connect();

    const sortObj: { [key: string]: SortOrder } = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    let query = {};
    if (keywords) {
      query = { name: { $regex: keywords, $options: 'i' } };
    }
    if (letter) {
      if (letter === '#') {
        query = { name: { $regex: '^[0-9]', $options: 'i' } };
      } else {
        query = { name: { $regex: `^${letter}`, $options: 'i' } };
      }
    }

    const hubs = await Hub.find(query).sort(sortObj).skip(offset).limit(limit);
    if (!hubs) throw new Error("Can't load hubs");

    const totalStores = await Hub.countDocuments(query);

    return NextResponse.json(
      {
        message: 'success',
        data: hubs,
        pagination: {
          total: totalStores,
          page,
          limit,
          pages: Math.ceil(totalStores / limit),
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

//create a hub
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    if (!body) {
      return NextResponse.json(
        { message: 'No data provided' },
        { status: 400 }
      );
    }

    const hub = await Hub.findOne({ name: body.name });
    if (hub) {
      return NextResponse.json(
        {
          message: 'Hub with this name already exists',
        },
        { status: 400 }
      );
    }

    const goodEmail = verfyEmail(body.name, body.email);

    if (!goodEmail) {
      return NextResponse.json(
        {
          message: 'Please enter an official email',
        },
        { status: 400 }
      );
    }

    const hubEmail = await Hub.findOne({ name: body.email });
    if (hubEmail) {
      return NextResponse.json(
        {
          message: 'Hub with this email already exists',
        },
        { status: 400 }
      );
    }

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

    await Hub.create({ ...body, location });

    return NextResponse.json(
      { message: 'Hub created successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json('Error in creating hub:' + error.message, {
      status: 400,
    });
  }
};
