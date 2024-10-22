import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import User from '@/lib/Models/user';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get('page') || '1');
    let limit = parseInt(searchParams.get('limit') || '10');

    page = page ? page : 1;
    limit = limit ? limit : 10;

    const offset = (page - 1) * limit;

    await connect();

    const users = await User.find().skip(offset).limit(limit);
    if (!users) throw new Error("Can't load hubs");

    const totalUsers = await User.countDocuments();

    return NextResponse.json(
      {
        message: 'success',
        data: users,
        pagination: {
          total: totalUsers,
          page,
          limit,
          pages: Math.ceil(totalUsers / limit),
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

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const user = await User.findOne({ email: body.email });
    if (user) throw new Error('User already exists');

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { message: 'User has been created' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json('Error creating user' + error.message, {
      status: 400,
    });
  }
};
