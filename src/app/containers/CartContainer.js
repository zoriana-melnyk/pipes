'use client';

import { useContext, useState } from 'react';
import { AppContext } from '../service/AppContext';
import {
  REMOVE_PRODUCT,
  PRODUCT_AMOUNT_CHANGE,
} from '../service/contextDispatchTypes';
import { Button, Spinner } from 'flowbite-react';
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import { ShopingCart, UserOrders } from '../components';
import { toast } from 'sonner';
import { HiShoppingCart, HiShoppingBag } from 'react-icons/hi';

function CartContainer() {
  const {
    selectedProducts,
    dispatch,
    isUserLoading,
    user = {},
  } = useContext(AppContext);
  const [tabState, setTabState] = useState({
    isOrders: false,
  });
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

  const onTabChange = () => {
    setTabState((prev) => ({
      ...prev,
      isOrders: !prev.isOrders,
    }));
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <ButtonGroup className="flex justify-center mb-5">
        <Button
          color={!tabState.isOrders ? 'blue' : 'gray'}
          onClick={onTabChange}
        >
          Кошик <HiShoppingBag />
        </Button>
        <Button
          color={tabState.isOrders ? 'blue' : 'gray'}
          onClick={onTabChange}
          className="relative"
        >
          Замовлення <HiShoppingCart />
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {user?.orders?.length}
          </div>
        </Button>
      </ButtonGroup>
      {tabState.isOrders ? (
        <UserOrders orders={user?.orders || []} />
      ) : (
        <ShopingCart
          data={{ products: selectedProducts, cartOrdering }}
          actions={{ onAmountChange, removeFromCart, onCheckout }}
        />
      )}
    </div>
  );
}

export { CartContainer };
