// // app/api/save-to-mongo/route.ts
// import { NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI!;
// const client = new MongoClient(uri);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log('Connecting to MongoDB...');
    
//     await client.connect();
//     const db = client.db('nexium_internship');
//     const collection = db.collection('job_results');

//     const result = await collection.insertOne(body);
//     return NextResponse.json({ message: 'Data saved to MongoDB!', id: result.insertedId });
//   } catch (error) {
//     console.error('Mongo Error:', error);  // 👈 See this in terminal
//     return NextResponse.json({ error: 'Failed to save to MongoDB' }, { status: 500 });
//   }
// }
// app/api/save-to-mongo/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const user_id = formData.get('user_id') as string;
    const job_title = formData.get('job_title') as string;
    const ai_summary = formData.get('ai_summary') as string;
    const created_at = formData.get('created_at') as string;

    const data = {
      user_id,
      job_title,
      ai_summary,
      created_at,
    };

    console.log('Connecting to MongoDB...');
    await client.connect();

    const db = client.db('nexium_internship');
    const collection = db.collection('job_results');

    const result = await collection.insertOne(data);
    return NextResponse.json({ message: 'Data saved to MongoDB!', id: result.insertedId });
  } catch (error) {
    console.error('Mongo Error:', error);
    return NextResponse.json({ error: 'Failed to save to MongoDB' }, { status: 500 });
  }
}
