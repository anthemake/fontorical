import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/nextAuthOptions';
import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT!,
  key: process.env.COSMOS_DB_KEY!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
    }

    const container = client.database(process.env.COSMOS_DB_DATABASE!).container(process.env.COSMOS_DB_CONTAINER!);

    // Delete the user's data based on their user ID
    await container.item(session.user.id, session.user.id).delete();

    return new Response(JSON.stringify({ success: true, message: 'Data deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}
