'use client';

import { Button } from 'flowbite-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../service/AppContext';
import { SET_USER } from '../service/contextDispatchTypes';

export default function User() {
  const initialUser = {
    name: '',
    avatarUrl: '',
    preview: '',
    email: '',
  };
  const [user, setUser] = useState(initialUser);
  const { push } = useRouter();
  const { dispatch } = useContext(AppContext);

  const setUserAction = (user) => {
    dispatch({ type: SET_USER, payload: user });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // get user data from form
    const { nickname, email } = event.target.elements;

    // create user object
    const body = {
      name: nickname.value,
      email: email.value,
      avatarUrl: user.preview,
    };

    // store user object in local storage
    window.localStorage.setItem('user', JSON.stringify(body));
    setUserAction(body);

    // redirect to home page
    push('/');
  };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64StringUS = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');

      setUser({
        ...user,
        avatarUrl: 'data:image/png;base64,' + base64StringUS,
        preview: 'data:image/png;base64,' + base64StringUS,
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // const blobUrl = getBase64ImageSource();
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      // set avatar to state in blob format
      setUser({
        ...initialUser,
        ...user,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: reset user data
  return (
    <div className="flex flex-1 justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-bold font-medium">
            Nickname
            <input
              defaultValue={user.nickname}
              name="nickname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Custom nick name"
              required
            />
          </label>
          <label className="block mb-2 text-bold font-medium">
            Email
            <input
              defaultValue={user.email}
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email"
              required
            />
          </label>
        </div>
        <div className="mb-6 flex items-center">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input
              accept="image/*"
              name="avatarUrl"
              type="file"
              onChange={imageUpload}
            />
          </label>

          {user.avatarUrl ? (
            <Image
              className="rounded-full"
              width={100}
              height={100}
              src={user.avatarUrl || '/avatar.png'}
              alt="user avatar"
            />
          ) : null}
        </div>

        <Button type="submit" color="blue">
          Submit
        </Button>
      </form>
    </div>
  );
}
