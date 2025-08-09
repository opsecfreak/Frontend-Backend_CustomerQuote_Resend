import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Dashboard from '@/components/Dashboard';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin-session')?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/');
  }

  return <Dashboard />;
}
