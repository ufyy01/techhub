import { connect } from '@/lib/db';
import Claimed from '@/lib/Models/claimed';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
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

    const claimed = await Claimed.findOne({ user: userId });
    if (!claimed) throw new Error("Can't load claimed hubs");

    const checkIndex = claimed.hubs.findIndex(
      (hub: { _id: any }) => hub._id.toString() === hubId
    );
    if (checkIndex === -1)
      return NextResponse.json({
        message: 'isNotClaimed',
      });
    else
      return NextResponse.json({
        message: 'isClaimed',
      });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error in fetching hubs' + error.message },
      {
        status: 400,
      }
    );
  }
};
