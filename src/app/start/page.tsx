import { getServerSession } from 'next-auth/next';
import { authOptions } from '../lib/nextAuthOptions';
import { redirect } from 'next/navigation';
import GameClientComponent from './GameClientComponent';
import { CosmosClient } from '@azure/cosmos';
import FadeInComponent from './FadeInComponent';


const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT!,
  key: process.env.COSMOS_DB_KEY!,
});

export default async function StartPage() {
 
  const session = await getServerSession(authOptions);

  
  if (!session) {
    redirect('/api/auth/signin');
    return null;
  }

 
  const container = client
    .database(process.env.COSMOS_DB_DATABASE!)
    .container(process.env.COSMOS_DB_CONTAINER!);

 
  const { resources } = await container.items
    .query({
      query: 'SELECT c.username FROM c WHERE c.userId = @userId',
      parameters: [{ name: '@userId', value: session.user.id }],
    })
    .fetchAll();

  if (resources.length === 0) {
    
    redirect('/auth/create-username');
    return null;
  }

  
  const username = resources[0].username;

  
  return (
    <FadeInComponent>
      <main className="h-screen bg-background text-textcolor flex flex-col justify-between p-8">
        <h1 className="text-4xl font-bold">
          Welcome to the Game, {username || 'Player'}
        </h1>
        
        <GameClientComponent />
      </main>
    </FadeInComponent>
  );
}
