import React, { useEffect, useRef, useState } from 'react';
import Card from '@geist-ui/react/esm/card';
import Input from '@geist-ui/react/esm/input';
import Button from '@geist-ui/react/esm/button';
import Select from '@geist-ui/react/esm/select';
import styled from 'styled-components';
import { useSignupUserMutation } from '../store/api/appApi';
import { Loading, useToasts } from '@geist-ui/react';

function SignUp() {
    const [signupUser, { isLoading }] = useSignupUserMutation();
    const [toast, setToast] = useToasts();
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((e) => {
            setLocation(() => ({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
            }));
        });
    }, []);

    const form = useRef(null);
    var [interests, setInterests] = useState(null);
    if (isLoading) {
        return <Loading />;
    }

    const handleSignup = async (e) => {
        const data = Object.fromEntries(new FormData(form.current).entries());
        data.interests = interests;
        data.location = location;

        if (data.password !== data.confirmPassword) {
            form.current.reset();
            setToast({ text: 'Passwords did not match!', type: 'warning' });
        } else {
            delete data.confirmPassword;
            const resp = await signupUser(data);
            // console.log(resp);
            if (resp?.error?.status === 400) {
                setToast({
                    text: 'Duplicate User',
                    type: 'error',
                });
            } else {
                setToast({
                    text: 'Successfully created account! Login to continue...',
                    type: 'success',
                });
            }
        }
    };

    return (
        <Card shadow>
            <Card.Content>
                <h3>Sign Up</h3>
                <Form method='POST' onSubmit={handleSignup} ref={form}>
                    <Input label='Name' width='100%' name='name' />
                    <Input label='Username' width='100%' name='username' />
                    <Input.Password
                        label='Password'
                        width='100%'
                        name='password'
                    />
                    <Input.Password
                        label='Confirm Password'
                        width='100%'
                        name='confirmPassword'
                    />

                    <Input
                        disabled
                        label='Latitude'
                        value={location.latitude}
                    />
                    <Input
                        disabled
                        label='Longitude'
                        value={location.longitude}
                    />

                    <Select
                        placeholder='Select Your Interests'
                        multiple
                        name='interests'
                        onChange={(val) => setInterests(val)}>
                        <Select.Option value='Tech'>Tech</Select.Option>
                        <Select.Option value='Finance'>Finance</Select.Option>
                        <Select.Option value='Sports'>Sports</Select.Option>
                        <Select.Option value='Business'>Business</Select.Option>
                        <Select.Option value='World'>World</Select.Option>
                        <Select.Option value='Food'>Food</Select.Option>
                        <Select.Option value='Travel'> Travel </Select.Option>
                    </Select>

                    <Button type='success' htmlType='submit'>
                        Sign Up
                    </Button>
                </Form>
            </Card.Content>
        </Card>
    );
}
export default SignUp;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
