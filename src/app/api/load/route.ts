import { NextResponse } from 'next/server';
import { CosmosClient } from '@azure/cosmos';

const endpoint = process.env.NEXT_PUBLIC_COSMOS_DB_ENDPOINT;
const key = process.env.NEXT_PUBLIC_COSMOS_DB_KEY;
const databaseId = process.env.NEXT_PUBLIC_COSMOS_DB_DATABASE;
const containerId = process.env.NEXT_PUBLIC_COSMOS_DB_CONTAINER;

const client = new CosmosClient({ endpoint, key });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    const container = client.database(databaseId).container(containerId);

    // Query game state by user ID
    const { resources } = await container.items.query({
      query: 'SELECT * FROM c WHERE c.id = @userId',
      parameters: [{ name: '@userId', value: userId }],
    }).fetchAll();

    if (resources.length > 0) {
      return NextResponse.json({ success: true, gameState: resources[0].gameState });
    }

    return NextResponse.json({ success: false, message: 'No game state found' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
