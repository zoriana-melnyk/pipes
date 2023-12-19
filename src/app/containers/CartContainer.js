'use client';

import { useContext, useState } from 'react';
import { AppContext } from '../service/AppContext';
import {
  REMOVE_PRODUCT,
  PRODUCT_AMOUNT_CHANGE,
} from '../service/contextDispatchTypes';
import { Button, Label, Spinner, Table } from 'flowbite-react';
import { UserOrders } from '../components';
import { toast } from 'sonner';

function CartContainer() {
  const {
    selectedProducts,
    dispatch,
    isUserLoading,
    user = {},
  } = useContext(AppContext);
  const [cartOrdering, setCartOrdering] = useState(false);

  const removeFromCart = (product) => {
    // ask user if he sure
    if (!window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
      return;
    }
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

  const onCheckout = async () => {
    setCartOrdering(true);
    const response = await fetch('/api/cart/checkout', {
      method: 'POST',
      body: JSON.stringify({
        token: user.token,
      }),
      headers: {
        Cookie: `token=${user.token}`,
      },
    });
    const res = await response.json();
    if (res.ok) {
      // dispacch custom event to update user
      window.dispatchEvent(new CustomEvent('user:update'));
      toast.success('Замовлення оформлено');
    } else {
      toast.error('Помилка оформлення замовлення');
    }
    setCartOrdering(false);
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <>
      <UserOrders orders={user?.orders || []} />
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {selectedProducts.length ? (
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
                  {selectedProducts.reduce((acc, cur) => {
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
      ) : (
        <h1 className="text-center">Кошик пустий</h1>
      )}
    </>
  );
}

export { CartContainer };
