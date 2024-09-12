import { connect } from '@/lib/db';
import Hub from '@/lib/Models/hub';
import { getLocation } from '@/lib/utils';
import { NextResponse } from 'next/server';

// export const claimHub: RequestHandler = async (req, res) => {
//   const { id } = req.params;
//   const { email } = req.body;
//   try {
//     const hub = await HubModel.findById(id);
//     if (!hub) throw new Error('Hub does not exist');

//     if (!verfyEmail(email, hub))
//       throw new Error('Please enter an official email');

//     const mailOptions = {
//       from: process.env.MAIL_USERNAME,
//       to: email,
//       subject: `Request to claim ${hub.name}`,
//       text: 'That was easy!',
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         return res
//           .status(400)
//           .json({
//             status: 'error',
//             message: 'Error sending message, please try again later.',
//             info: error,
//           });
//       } else {
//         return res.json({ status: 'success', message: info.response });
//       }
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'An unknown error occurred' });
//     }
//   }
// };

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

    let geoLocation = await getLocation(body.address);
    if (!geoLocation) {
      return NextResponse.json(
        {
          message: 'Location not found, Please enter a valid location',
        },
        { status: 400 }
      );
    }

    const { lat, lng } = geoLocation;

    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
    const newhub = await Hub.findByIdAndUpdate(
      id,
      { ...request.body },
      location
    );

    await newhub!.save();

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
