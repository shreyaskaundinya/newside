import { Divider, Loading, Text } from '@geist-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NewsSlides from '../components/NewsSlides';
import { useGetUserBookmarksQuery } from '../store/api/appApi';
import { addBookmarks } from '../store/slices/userSlice';
import BasePage from './BasePage';

function Bookmarks() {
    // get user using useSelector
    const user = useSelector((state) => state.user.user);

    const { data, error, isLoading, isSuccess } = useGetUserBookmarksQuery(
        user._id
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addBookmarks(data.bookmarks));
        }
    }, [isSuccess, isLoading]);

    console.log(data);
    return (
        <BasePage>
            <Text h1>Bookmarks</Text>
            <Divider y={0} style={{ marginBottom: '2rem' }} />
            <Section>
                {isLoading ? (
                    <Loading />
                ) : data?.bookmarks ? (
                    <NewsSlides
                        title=''
                        limit={50}
                        articles={data?.bookmarks}
                        type='bookmarks'
                    />
                ) : (
                    <>No Bookmarks...</>
                )}
            </Section>
        </BasePage>
    );
}

export default Bookmarks;

const Section = styled.div``;
