import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import User from '@/lib/Models/user';
// import { getToken } from 'next-auth/jwt';

export const maxDuration = 5; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

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
    const { name, password, role, email } = await request.json();

    if (!name || !password || !role || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    await connect();

    const user = await User.findOne({ email: email });
    if (user)
      return NextResponse.json(
        { message: 'User already exist! Kindly login in 😒' },
        { status: 400 }
      );

    const newUser = new User({ name, password, role, email });
    await newUser.save();

    return NextResponse.json(
      { message: 'Profile has been created 🎉' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json('Error creating user' + error.message, {
      status: 400,
    });
  }
};

export const PATCH = async (request: Request) => {
  // const secret = process.env.AUTH_SECRET;
  try {
    // const token = await getToken({ req: request, secret });
    // if (!token) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
    const { role, email } = await request.json();

    if (!role || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    await connect();

    const user = await User.findOneAndUpdate({ email: email }, { role: role });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found 😒' },
        { status: 400 }
      );
    }
    // token.role = user.role;
    // token.refresh = true;

    return NextResponse.json(
      { message: 'Profile has been updated 🎉' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json('Error updating user ' + error.message, {
      status: 400,
    });
  }
};
