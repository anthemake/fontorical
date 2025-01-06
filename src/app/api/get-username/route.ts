import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/nextAuthOptions';
import { NextResponse } from 'next/server';
import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT!,
  key: process.env.COSMOS_DB_KEY!,
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const container = client
      .database(process.env.COSMOS_DB_DATABASE!)
      .container(process.env.COSMOS_DB_CONTAINER!);

    // Query to get the username
    const { resources } = await container.items
      .query({
        query: 'SELECT c.username FROM c WHERE c.userId = @userId',
        parameters: [{ name: '@userId', value: session.user.id }],
      })
      .fetchAll();

    if (resources.length > 0) {
      return NextResponse.json({ username: resources[0].username });
    } else {
      return new NextResponse('Username not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching username:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
