'use client';

import { useContext } from 'react';
import { AppContext } from '../service/AppContext';
import {
  REMOVE_PRODUCT,
  PRODUCT_AMOUNT_CHANGE,
} from '../service/contextDispatchTypes';
import { Button, Table } from 'flowbite-react';

function CartContainer() {
  const { selectedProducts, dispatch } = useContext(AppContext);

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product });
    fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({
        _id: product._id,
      }),
    });
  };

  const onAmountChange = (product, amount) => {
    if (amount < 1) {
      return;
    }
    dispatch({ type: PRODUCT_AMOUNT_CHANGE, payload: { ...product, amount } });
  };

  if (!selectedProducts.length) {
    return <h1 className="text-center">Кошик пустий</h1>;
  }

  return (
    <div className="overflow-x-auto">
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
          {selectedProducts.map((product) => {
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
            <Table.Cell colSpan="5" className="text-right font-bold">
              Загалом до сплати:{' '}
              {selectedProducts.reduce((acc, cur) => {
                return acc + Number(cur.totalPrice);
              }, 0)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export { CartContainer };
