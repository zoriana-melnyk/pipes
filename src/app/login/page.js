'use client';

import { Button, Label, TextInput, Tabs } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../service/AppContext';
import { SET_USER } from '../service/contextDispatchTypes';
import { ProfileForm } from '../components';
import { HiUserCircle, HiOutlineUserAdd } from 'react-icons/hi';
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import { toast } from 'sonner';

export default function LoginPage() {
  const [loginState, setLoginState] = useState({
    isLogin: true,
  });
  const { push } = useRouter();
  const { dispatch } = useContext(AppContext);

  const setUserAction = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get user data from form
    const { password, email } = event.target.elements;

    // create user object
    const body = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const { data, ok } = await response.json();

      if (!ok) {
        throw new Error('Invalid credentials');
      }

      // store user object in local storage
      setUserAction(data);
      window.localStorage.setItem('user', JSON.stringify(data));
      window.localStorage.setItem('token', data.token);
      toast.success('Signed in successfully');
      // redirect to home page
      push('/');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const onMethodSwitch = () => {
    setLoginState((prev) => ({
      ...prev,
      isLogin: !prev.isLogin,
    }));
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <ButtonGroup>
        <Button
          color={loginState.isLogin ? 'blue' : 'gray'}
          onClick={onMethodSwitch}
        >
          Login <HiUserCircle />
        </Button>
        <Button
          color={!loginState.isLogin ? 'blue' : 'gray'}
          onClick={onMethodSwitch}
        >
          Register <HiOutlineUserAdd />
        </Button>
      </ButtonGroup>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      {loginState.isLogin ? (
        <form onSubmit={handleSubmit}>
          <Label className="block mb-2 text-bold font-medium">
            Email
            <TextInput name="email" placeholder="email" required />
          </Label>

          <Label className="block mb-2 text-bold font-medium">
            Password
            <TextInput
              type="password"
              name="password"
              placeholder="password"
              required
            />
          </Label>

          <Button type="submit" color="blue">
            Submit
          </Button>
        </form>
      ) : (
        <ProfileForm />
      )}
    </div>
  );
}
