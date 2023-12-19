import { Button, Label, Table } from 'flowbite-react';

export const ShopingCart = ({
  data: { products = [], cartOrdering = false },
  actions: { onAmountChange, removeFromCart, onCheckout },
}) => {
  if (!products.length) {
    return <h1 className="text-center">Кошик пустий</h1>;
  }
  return (
    <div className="overflow-x-auto my-4">
      <Label className="flex w-full text-center justify-center">
        Обрані товари
      </Label>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Назва</Table.HeadCell>
          <Table.HeadCell>Опис</Table.HeadCell>
          <Table.HeadCell>Ціна</Table.HeadCell>
          <Table.HeadCell>Кількість</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products.map((product) => {
            return (
              <Table.Row
                key={product._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>{product.totalPrice}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <Button
                      disabled={product.amount === 1}
                      onClick={() =>
                        onAmountChange(product, (product.amount || 1) - 1)
                      }
                    >
                      -
                    </Button>
                    <div className="mx-2">{product.amount || 1}</div>
                    <Button
                      onClick={() =>
                        onAmountChange(product, (product.amount || 1) + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {/* total */}
            <Table.Cell colSpan="4" className="text-right font-bold">
              Загалом до сплати:{' '}
              {products.reduce((acc, cur) => {
                return acc + Number(cur.totalPrice);
              }, 0)}
            </Table.Cell>
            <Table.Cell className="text-right font-bold">
              {/* checkout action */}
              <Button
                disabled={cartOrdering}
                onClick={onCheckout}
                color="success"
              >
                Оформити
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
