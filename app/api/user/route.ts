import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import { SortOrder } from 'mongoose';
import User from '@/lib/Models/user';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    let sort = searchParams.get('sort');
    let order = searchParams.get('order');
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '10');

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

    const users = await User.find().sort(sortObj).skip(offset).limit(limit);
    if (!users) throw new Error("Can't load hubs");

    const totalStores = await User.countDocuments();

    return NextResponse.json(
      JSON.stringify({
        message: 'success',
        data: users,
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
