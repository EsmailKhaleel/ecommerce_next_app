import { auth } from '@/util/auth';
import CartPageClient from './cart-page-client';

export default async function CartPage() {
  const session = await auth();
  if (!session) {
    return;
  }

  return <CartPageClient session={session} />;
}