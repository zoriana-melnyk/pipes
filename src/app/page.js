'use client';

import { Products } from './containers/ProductsContainer';
import Skeleton from './HOC/skeleton';

export default function HomePage() {
  return (
    <Skeleton>
      <Products />
    </Skeleton>
  );
}
