import { Button, Loading, Spacer, Text } from '@geist-ui/react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import NewsSlides from '../components/NewsSlides';
import Weather from '../components/Weather';
import BasePage from './BasePage';
import { motion } from 'framer-motion';
import { news } from '../utils/sampleNews';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLatestArticlesQuery } from '../store/api/appApi';
import { pushArticles } from '../store/slices/articlesSlice';

function Home() {
    const history = useHistory();
    const { data, isLoading } = useGetLatestArticlesQuery();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) dispatch(pushArticles(data.articles));
    }, [data]);

    return (
        <BasePage>
            <HeroContainer>
                <Text h1 style={{ margin: 0 }}>
                    NewSide : Fast, Quick News For All!
                </Text>
                <Text p>We aggregate news and provide you the summary!</Text>

                {user ? (
                    <Text h2>Welcome, {user.name}</Text>
                ) : (
                    <Button
                        type='success'
                        onClick={() => history.push('/auth')}>
                        Create an Account now!
                    </Button>
                )}
            </HeroContainer>
            <Spacer h={4} />
            <Section>
                <Weather />
            </Section>
            <Spacer h={4} />
            <Section>
                {isLoading ? (
                    <Loading />
                ) : (
                    <NewsSlides
                        title='Breaking News'
                        limit={9}
                        articles={data.articles}
                    />
                )}
            </Section>
            <Spacer h={4} />
            <Section>
                <NewsSlides title='Trending News' limit={6} articles={news} />
            </Section>
        </BasePage>
    );
}

export default Home;

const HeroContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const Section = styled.div``;
