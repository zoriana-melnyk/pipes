import { Card, Tooltip } from 'flowbite-react';
import { toast } from 'sonner';

function ProductCard({ product, actions, isSelected }) {
  const { name: title, description, imageSrc, price, currency } = product;
  const { addToCart, removeFromCart } = actions;

  return (
    <Card
      className="flex flex-col items-center justify-center p-8 text-center "
      renderImage={() => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`http://localhost:3000/${imageSrc}`}
          alt="done"
          style={{ aspectRatio: '1 / 1', width: '150px', height: 'auto' }}
          width={'auto'}
          height={'auto'}
        />
      )}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="max-w-xs font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
          {price} {currency}
        </p>
        {addToCart && (
          <Tooltip
            content={isSelected ? 'Видалити з кошика' : 'Додати в кошик'}
          >
            <button
              onClick={() => {
                isSelected ? removeFromCart(product) : addToCart(product);
                !isSelected &&
                  toast('Товар додано до кошика', {
                    action: {
                      label: 'Undo',
                      onClick: () => removeFromCart(product),
                    },
                  });
              }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-basket2"
                viewBox="0 0 17 17"
              >
                <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z" />
              </svg>
              <span
                className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${
                  isSelected ? 'bg-opacity-0 dark:bg-opacity-0' : ''
                }`}
              >
                {isSelected ? 'Додано' : 'Обрати'}
              </span>
            </button>
          </Tooltip>
        )}
      </div>
    </Card>
  );
}

export { ProductCard };
