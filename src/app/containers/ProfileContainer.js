'use client';

import { Label, TextInput, Button } from 'flowbite-react';

import { useState, useEffect } from 'react';

const ProfileContainer = () => {
  // use single state for all the fields
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch the current user's profile information here
    // For example:
    // setName(user.name);
    // setEmail(user.email);
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Update the user's profile information here
  };

  return (
    <form onSubmit={onSubmit} className="mx-10 my-3">
      <Label>
        Name:
        <TextInput
          type="text"
          name="name"
          value={user.name}
          onChange={onChange}
        />
      </Label>
      <Label>
        Email:
        <TextInput
          type="email"
          name="email"
          value={user.email}
          onChange={onChange}
        />
      </Label>
      <Label>
        Password:
        <TextInput
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
        />
      </Label>
      <Button type="submit">Update Profile</Button>
    </form>
  );
};

export { ProfileContainer };
