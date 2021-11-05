import React from 'react';
import Card from '@geist-ui/react/esm/card';
import Input from '@geist-ui/react/esm/input';
import Button from '@geist-ui/react/esm/button';

import styled from 'styled-components';

function Login() {
    return (
        <Card style={{ height: 'max-content' }} shadow>
            <Card.Content>
                <h3>Log In</h3>
                <Form action='' method=''>
                    <Input label='Username' width='100%' />

                    <Input.Password label='Password' width='100%' />

                    <Button type='success'>Login</Button>
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
