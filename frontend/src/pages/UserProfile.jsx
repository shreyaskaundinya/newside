import {
    Button,
    Card,
    Divider,
    Input,
    Select,
    Tag,
    Text,
} from '@geist-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useUpdateUserMutation } from '../store/api/appApi';
import { updateUser } from '../store/slices/userSlice';
import BasePage from './BasePage';

function UserProfile(props) {
    const user = useSelector((state) => state.user.user);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(0);
    var [interests, setInterests] = useState(null);
    const [updateUserInDb, { isLoading }] = useUpdateUserMutation();
    const dispatch = useDispatch();

    const handleUpdateUser = () => {
        setEdit(false);
        // save user in state
        dispatch(updateUser({ username: username, interests: interests }));
        // send new username and interests to db using mutation query
        updateUserInDb(user);
    };

    console.log(user);
    return (
        <BasePage>
            {user && user._id ? (
                <>
                    <Text h1>Profile</Text>
                    <Divider y={0} style={{ marginBottom: '2rem' }} />
                    <Card>
                        {edit ? (
                            <Input
                                type='text'
                                placeholder='Modify Your Name'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        ) : (
                            <Card.Content>
                                <p>UserName: {user.username}</p>
                            </Card.Content>
                        )}
                        <Divider y={0} />
                        <Card.Content>
                            <Text p>Your Interests</Text>
                            {edit ? (
                                <Select
                                    placeholder='Select Your Interests'
                                    multiple
                                    name='interests'
                                    onChange={(val) => setInterests(val)}>
                                    <Select.Option value='Tech'>
                                        Tech
                                    </Select.Option>
                                    <Select.Option value='Finance'>
                                        Finance
                                    </Select.Option>
                                    <Select.Option value='Sports'>
                                        Sports
                                    </Select.Option>
                                    <Select.Option value='Business'>
                                        Business
                                    </Select.Option>
                                    <Select.Option value='World'>
                                        World
                                    </Select.Option>
                                    <Select.Option value='Food'>
                                        Food
                                    </Select.Option>
                                    <Select.Option value='Travel'>
                                        {' '}
                                        Travel{' '}
                                    </Select.Option>
                                </Select>
                            ) : (
                                <Interests>
                                    {user?.interests?.map((interest) => (
                                        <Tag type='success'>{interest}</Tag>
                                    ))}
                                </Interests>
                            )}
                        </Card.Content>
                        <Card.Footer>
                            <Actions>
                                {edit ? (
                                    <Button
                                        type='success'
                                        ghost
                                        onClick={handleUpdateUser}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        type='warning'
                                        ghost
                                        onClick={() => setEdit(true)}>
                                        Edit Account
                                    </Button>
                                )}

                                <Button type='error' ghost>
                                    <Text p>Delete Account</Text>
                                </Button>
                            </Actions>
                        </Card.Footer>
                    </Card>
                </>
            ) : (
                <>Please Login to Continue...</>
            )}
        </BasePage>
    );
}

export default UserProfile;

const Interests = styled.div`
    display: flex;
    gap: 1rem;
`;
const Actions = styled.div`
    display: flex;
    gap: 1rem;
`;
