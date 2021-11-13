import { Button, Card, Divider, Select, Tag, Text } from '@geist-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useUpdateUserMutation } from '../store/api/appApi';
import { updateUser } from '../store/slices/userSlice';
import BasePage from './BasePage';

function UserProfile(props) {
    const user = useSelector((state) => state.user.user);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    var [interests, setInterests] = useState(null);
    const [updateUserInDb, { isLoading }] = useUpdateUserMutation();
    const dispatch = useDispatch();

    const handleUpdateUser = () => {
        setEdit(false);
        if (username != null && name != null && interests?.length > 0) {
            // save user in state
            dispatch(updateUser({ username, interests, name }));
            // send new username and interests to db using mutation query
            console.log(user._id);
            updateUserInDb({ username, name, interests, id: user._id });
        }
    };

    // console.log(user);
    return (
        <BasePage>
            {user && user._id ? (
                <>
                    <Text h1>Profile</Text>
                    <Divider y={0} style={{ marginBottom: '2rem' }} />
                    <ProfileCard>
                        <Card.Content>
                            {edit ? (
                                <>
                                    <div>
                                        <label for='name'>
                                            <strong>Name : </strong>
                                            <input
                                                id='name'
                                                type='text'
                                                placeholder={user.name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </label>
                                    </div>
                                    <br />
                                    <div>
                                        <label for='username'>
                                            <strong>Username : </strong>
                                            <input
                                                id='username'
                                                type='text'
                                                placeholder={user.username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>Name : </strong> {user.name}
                                    </p>
                                    <p>
                                        <strong>Username : </strong>{' '}
                                        {user.username}
                                    </p>
                                </>
                            )}
                        </Card.Content>
                        <Divider y={0} />
                        <Card.Content>
                            <Text p>
                                <strong>Your Interests</strong>
                            </Text>
                            {edit ? (
                                <Select
                                    placeholder='Select Your Interests'
                                    multiple
                                    name='interests'
                                    value={user.interests}
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
                                        <Tag type='success' key={interest}>
                                            {interest}
                                        </Tag>
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

                                {/* <Button type='error' ghost>
                                    <Text p>Delete Account</Text>
                                </Button> */}
                            </Actions>
                        </Card.Footer>
                    </ProfileCard>
                </>
            ) : (
                <>Please Login to Continue...</>
            )}
        </BasePage>
    );
}

export default UserProfile;

const ProfileCard = styled(Card)`
    max-width: 500px;
    margin: 0 auto;
`;

const Interests = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;
const Actions = styled.div`
    display: flex;
    gap: 1rem;
`;
