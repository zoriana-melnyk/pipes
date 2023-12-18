import { Button, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../service/AppContext';
import { SET_USER } from '../service/contextDispatchTypes';
import { toast } from 'sonner';

function ProfileForm() {
  const initialUser = {
    firstName: '',
    lastName: '',
    avatarUrl: '',
    preview: '',
    email: '',
    phoneNumber: '',
  };
  const [user, setUser] = useState(initialUser);
  const { push } = useRouter();
  const { dispatch, user: storedUser } = useContext(AppContext);

  const setUserAction = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get user data from form
    const { firstName, lastName, email, phoneNumber, password } =
      event.target.elements;

    // create user object
    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      avatarUrl: user.preview,
      phoneNumber: phoneNumber.value,
      password: password.value,
    };

    // filter empty values
    Object.keys(body).forEach((key) => {
      if (!body[key]) {
        delete body[key];
      }
    });

    try {
      const isExistingUser = storedUser?.email;
      const apiPath = isExistingUser
        ? `/api/user/${storedUser._id}`
        : '/api/user/register';
      const apiMethod = isExistingUser ? 'PUT' : 'POST';
      const response = await fetch(apiPath, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { data } = await response.json();

      // store user object in local storage
      setUserAction(data);
      window.localStorage.setItem('user', JSON.stringify(data));
      toast.success(
        isExistingUser
          ? 'User updated successfully'
          : 'User created successfully'
      );
      // redirect to home page
      isExistingUser ? push('/') : push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 2097152) {
      toast.error('File have to be under 2Mbit');
      return;
    }
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
    const { password, ...restUser } = storedUser || {};
    if (restUser.email) {
      // set avatar to state in blob format
      setUser({
        ...initialUser,
        ...restUser,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedUser]);

  // TODO: reset user data
  return (
    <div className="flex flex-1 justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex gap-2">
            <Label className="block mb-2 text-bold font-medium">
              First Name
              <TextInput
                defaultValue={user.firstName}
                name="firstName"
                placeholder="Last name"
                required
              />
            </Label>

            <Label className="block mb-2 text-bold font-medium">
              Last Name
              <TextInput
                defaultValue={user.lastName}
                name="lastName"
                placeholder="Last name"
                required
              />
            </Label>
          </div>

          <Label className="block mb-2 text-bold font-medium">
            Email
            <TextInput
              defaultValue={user.email}
              name="email"
              placeholder="email"
              required
            />
          </Label>
          <Label>
            Phone number
            <TextInput
              defaultValue={user.phoneNumber}
              name="phoneNumber"
              label="Phone number"
              placeholder="Phone number"
            />
          </Label>
          <Label>
            Password
            <TextInput
              defaultValue={user.password}
              type="password"
              name="password"
              placeholder="password"
            />
          </Label>
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

export { ProfileForm };
