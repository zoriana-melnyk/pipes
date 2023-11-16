import { ProductCard } from '../components';

function Products() {
  return (
    <div className="grid my-6 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export { Products };