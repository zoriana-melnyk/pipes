
import { Card } from 'flowbite-react';
import Image from 'next/image';

function ProductCard({ title, text, image }) {
  return (
    <Card
      className="flex flex-col items-center justify-center p-8 text-center "
      renderImage={() => <Image
        style={{ aspectRatio: '1 / 1', width: '200px', height: 'auto' }}
        src={image} alt="pipes_img" />}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {text}
      </p>
    </ Card >
  );
}

export { ProductCard }