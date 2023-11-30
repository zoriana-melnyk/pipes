'use client';

import { Dropdown, Label, TextInput } from 'flowbite-react';
import Skeleton from '../HOC/skeleton';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [baseData, setBaseData] = useState({
        categories: [], // ['floor', 'ceil', 'wall']
        users: [],
        products: [],
        carts: []
    });
    const [pageData, setPageData] = useState({
        category: '',
        author: '',
        items: [],
        product: ''
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const request = await fetch('/api/category');
            const { data } = await request.json();
            return data;
        };

        const fetchUsers = async () => {
            const request = await fetch('/api/user');
            const { data } = await request.json();

            return data;
        };

        const fetchProduct = async () => {
            const request = await fetch('/api/product');
            const { data } = await request.json();
            return data;
        };

        const fetchCarts = async () => {
            const request = await fetch('/api/cart');
            const { data } = await request.json();
            return data;
        };

        const handleResults = async () => {
            const [categories, users, products, carts] = await Promise.all([
                fetchCategories(),
                fetchUsers(),
                fetchProduct(),
                fetchCarts(),
            ]);
            setBaseData({
                ...baseData,
                products,
                categories,
                users,
                carts
            })
        }
        handleResults();
    }, []);

    const onCategoryChange = (itemName) => {
        setPageData({
            ...pageData,
            category: itemName
        })
    }
    const onAuthorChange = (itemName) => {
        setPageData({
            ...pageData,
            author: itemName
        })
    }
    const onProductChange = (itemName) => {
        setPageData({
            ...pageData,
            items: [itemName],
            product: itemName,
        })
    }
    const onCartChange = (itemName) => {
        setPageData({
            ...pageData,
            cart: itemName
        })
    }

    const handleSubmit = (e, path) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        fetch(path || '/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formProps, ...pageData })
        });
    }
    const onSubmitUser = (e) => {
        handleSubmit(e, '/api/user')
    }
    const onSubmitProduct = (e) => {
        handleSubmit(e, '/api/product')
    }
    const onSubmitCategory = (e) => {
        handleSubmit(e, '/api/category')
    }
    const onSubmitProductCart = (e) => {
        handleSubmit(e, '/api/cart-product')
    }
    const onSubmitCart = (e) => {
        handleSubmit(e, '/api/cart')
    }

    return (
        <Skeleton>
            <div style={{ background: '#556677' }} >

                <form onSubmit={onSubmitUser}>
                    <Label>User</Label>

                    <TextInput name="firstName" placeholder='firstName' required />
                    <TextInput name="secondName" placeholder='secondName' required />
                    <TextInput name="phoneNumber" placeholder='phone' required />
                    <TextInput name="email" placeholder='email' required />

                    <button type='submit' >Save</button>
                </form>
                <form onSubmit={onSubmitProduct} >
                    <Label>Product</Label>

                    <TextInput name="name" placeholder='name' required />
                    <TextInput name="description" placeholder='description' required />
                    <TextInput name="price" placeholder='price' required />
                    <TextInput name="imageSrc" placeholder='imageSrc' required />
                    <Dropdown label={pageData.category || 'Category'} required>
                        {baseData.categories.map(({ name, _id }) => {
                            return <Dropdown.Item onClick={() => onCategoryChange(_id)}>{name}</Dropdown.Item>
                        })}
                    </Dropdown>

                    <button type='submit' >Save</button>
                </form>

                <form onSubmit={onSubmitCategory} >
                    <Label>Category</Label>
                    <TextInput name="name" placeholder='name' required />

                    <button type='submit' >Save</button>
                </form>


                <form onSubmit={onSubmitProductCart} >
                    <Label>Cart Product</Label>
                    <TextInput name="amount" placeholder='amount' required />
                    <Dropdown label={pageData.author || 'Author'} required>
                        {baseData.users.map(({ name, _id }) => {
                            return <Dropdown.Item onClick={() => onAuthorChange(_id)}>{name}</Dropdown.Item>
                        })}
                    </Dropdown>
                    <Dropdown label={pageData.items.length || 'Product'} required>
                        {baseData.products.map(({ name, _id }) => {
                            return <Dropdown.Item onClick={() => onProductChange(_id)}>{name}</Dropdown.Item>
                        })}
                    </Dropdown>
                    <Dropdown label={pageData.cart || 'Cart'} required>
                        {baseData.carts.map(({ name, _id }) => {
                            return <Dropdown.Item onClick={() => onCartChange(_id)}>{name}</Dropdown.Item>
                        })}
                    </Dropdown>

                    <button type='submit' >Save</button>
                </form>
                <form onSubmit={onSubmitCart} >
                    <Label>Cart</Label>
                    <TextInput name="name" placeholder='name' required />
                    <Dropdown label={pageData.author || 'Author'} required>
                        {baseData.users.map(({ name, _id }) => {
                            return <Dropdown.Item onClick={() => onAuthorChange(_id)}>{name}</Dropdown.Item>
                        })}
                    </Dropdown>
                    <Dropdown label={pageData.items.length || 'Product'} required>
                        {baseData.products.map(({ name, _id }) => {
                            return <Dropdown.Item onClick={() => onProductChange(_id)}>{name}</Dropdown.Item>
                        })}
                    </Dropdown>

                    <button type='submit' >Save</button>
                </form>
            </div>
        </Skeleton>
    );
}
