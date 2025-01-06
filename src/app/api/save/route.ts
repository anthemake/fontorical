import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/nextAuthOptions';
import { CosmosClient } from '@azure/cosmos';


const endpoint = process.env.COSMOS_DB_ENDPOINT!;
const key = process.env.COSMOS_DB_KEY!;
const databaseId = process.env.COSMOS_DB_DATABASE!;
const containerId = process.env.COSMOS_DB_CONTAINER!;


const client = new CosmosClient({ endpoint, key });

export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }


  const { gameState } = await req.json();
  const userId = session.user.id;

  try {

    const container = client.database(databaseId).container(containerId);


    const { resource } = await container.items.upsert({
      id: userId, // Use the user's Google ID as the unique identifier
      gameState,
    });

    return NextResponse.json({ success: true, resource }, { status: 200 });
  } catch (error) {
    console.error('Error saving game:', error);
    return NextResponse.json({ success: false, message: 'Error saving game state' }, { status: 500 });
  }
}
