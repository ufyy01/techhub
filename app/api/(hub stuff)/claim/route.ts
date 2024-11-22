import { connect } from '@/lib/db';
import Claimed from '@/lib/Models/claimed';
import Hub from '@/lib/Models/hub';
import { NextResponse } from 'next/server';

export const maxDuration = 5; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

//get all claimed hubs
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '10');
    let userId = searchParams.get('userId');

    page = page ? page : 1;
    limit = limit ? limit : 10;

    const offset = (page - 1) * limit;
    const end = page * limit;

    if (!userId)
      return NextResponse.json(
        { error: 'User not logged in' },
        { status: 400 }
      );

    await connect();

    const claimed = await Claimed.findOne({ user: userId });
    if (!claimed) throw new Error("Can't load claimed hubs");

    const claimedHubs = claimed.hubs.slice(offset, end);

    return NextResponse.json(
      {
        message: 'success',
        data: claimedHubs,
        pagination: {
          totalItems: claimed.hubs.length,
          currentPage: page,
          totalPages: Math.ceil(claimed.hubs.length / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error in fetching hubs' + error.message },
      {
        status: 400,
      }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get('userId');
    let hubId = searchParams.get('hubId');

    if (!userId)
      return NextResponse.json(
        { error: 'User not logged in' },
        { status: 400 }
      );
    if (!hubId)
      return NextResponse.json(
        { error: 'Selected hub not found' },
        { status: 400 }
      );

    await connect();

    let claimed = await Claimed.findOne({ user: userId });
    if (!claimed) {
      claimed = new Claimed({ user: userId, hubs: [] });
    }
    const hub = await Hub.findById(hubId);
    if (!hub)
      return NextResponse.json(
        { error: 'Hub does not exist' },
        { status: 400 }
      );

    const { name, images, state } = hub;

    const checkIndex = claimed.hubs.findIndex(
      (hub: { _id: any }) => hub._id.toString() === hubId
    );
    if (checkIndex === -1) {
      claimed.hubs.push({
        _id: hubId,
        name: name,
        images: images,
        state: state,
      });
      await claimed.save();
      await Hub.findByIdAndUpdate(
        { _id: hubId },
        { name, images, state, hubClaimed: true }
      );
      return NextResponse.json({ message: 'Hub Claimed!' }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'Hub has already been claimed!' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json('Error in fetching hubs' + error.message, {
      status: 400,
    });
  }
};
