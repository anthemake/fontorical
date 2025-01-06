import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/nextAuthOptions';
import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT!,
  key: process.env.COSMOS_DB_KEY!,
  
});

export async function POST(req: Request) {
  try {
    console.log("Received request to save username");

    // Get the session to check if the user is authenticated
    const session = await getServerSession(authOptions);
console.log("Session details in save-username route:", session);  // Log session again


    if (!session || !session.user || !session.user.id) {
      console.log("Session or user ID not found");
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
    }

    const { username } = await req.json();
    console.log("Username received:", username);

    if (!username || username.trim() === '') {
      console.log("Username is empty");
      return new Response(JSON.stringify({ success: false, message: 'Username cannot be empty' }), { status: 400 });
    }

    const container = client.database(process.env.COSMOS_DB_DATABASE!).container(process.env.COSMOS_DB_CONTAINER!);
    console.log("Connected to Cosmos DB container");

    // Check if the username already exists
    const { resources } = await container.items.query({
      query: 'SELECT * FROM c WHERE c.username = @username',
      parameters: [{ name: '@username', value: username }],
    }).fetchAll();
    console.log("Query result:", resources);

    if (resources.length > 0) {
      console.log("Username already taken");
      return new Response(JSON.stringify({ success: false, message: 'Username already taken' }), { status: 400 });
    }

    // Save the username linked to the user's Google ID
    await container.items.upsert({
      id: session.user.id,  // Use the Google ID as the unique identifier
      userId: session.user.id,  // Store the user ID explicitly
      username,  // Save the custom username
    });
    console.log("Username saved successfully");

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('Error in save-username route:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}
