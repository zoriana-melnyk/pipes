'use client';

import { Products } from './containers/Products';
import Skeleton from './HOC/skeleton';

export default function HomePage() {
  return (
    <Skeleton>
      <Products />
    </Skeleton>
  );
}
