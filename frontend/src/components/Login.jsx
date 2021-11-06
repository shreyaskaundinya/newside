import React, { useRef } from 'react';
import Card from '@geist-ui/react/esm/card';
import Input from '@geist-ui/react/esm/input';
import Button from '@geist-ui/react/esm/button';

import styled from 'styled-components';
import { useLoginUserMutation } from '../store/api/appApi';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { Loading, useToasts } from '@geist-ui/react';

function Login() {
    const [loginUser, { isLoading }] = useLoginUserMutation();

    const dispatch = useDispatch();
    const history = useHistory();
    const form = useRef(null);
    const [toast, setToast] = useToasts();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form.current).entries());

        // console.log(data);

        loginUser(data)
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(login(data.user));
                history.push('/');
            })
            .catch((error) => {
                // console.log(err);
                setToast({ text: error.data.err, type: 'error' });
            });
    };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <Card style={{ height: 'max-content' }} shadow>
            <Card.Content>
                <h3>Log In</h3>
                <Form method='POST' onSubmit={handleLogin} ref={form}>
                    <Input label='Username' width='100%' name='username' />

                    <Input.Password
                        label='Password'
                        width='100%'
                        name='password'
                    />

                    <Button type='success' htmlType='submit'>
                        Login
                    </Button>
                </Form>
            </Card.Content>
        </Card>
    );
}
export default Login;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
