import React from 'react';
import Card from '@geist-ui/react/esm/card';
import Input from '@geist-ui/react/esm/input';
import Button from '@geist-ui/react/esm/button';
import styled from 'styled-components';

function SignUp() {
    return (
        <Card shadow>
            <Card.Content>
                <h3>Sign Up</h3>
                <Form action='' method=''>
                    <Input label='Name' width='100%' name='name' />
                    <Input label='Username' width='100%' name='username' />
                    <Input.Password label='Password' width='100%' />
                    <Input.Password label='Confirm Password' width='100%' />
                    <Button type='success'>Sign Up</Button>
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
