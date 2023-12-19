'use client';

import { Label, Table } from 'flowbite-react';

export const UserOrders = ({ orders }) => {
  const StatusBudge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Обробляється
          </span>
        );
      case 'completed':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Завершено
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Відхилено
          </span>
        );
      case 'processing':
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            Доставляється
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            Невідомо
          </span>
        );
    }
  };
  return (
    <div className="overflow-x-auto my-4">
      <Label className="flex w-full text-center justify-center">
        {orders.length
          ? 'Ваші замовлення'
          : 'Ви ще не зробили жодного замовлення'}
      </Label>

      {orders.length ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Товари</Table.HeadCell>
            <Table.HeadCell>Дата</Table.HeadCell>
            <Table.HeadCell>Ціна</Table.HeadCell>
            <Table.HeadCell>Cтатус</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order) => {
              return (
                <Table.Row
                  key={order._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {order.items.map((item) => item.product.name).join(', ')}
                  </Table.Cell>
                  <Table.Cell>{order.createdAt}</Table.Cell>
                  <Table.Cell>{order.totalPrice}</Table.Cell>
                  <Table.Cell>{StatusBudge(order.status)}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : null}
    </div>
  );
};
