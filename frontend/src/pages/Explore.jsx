import { Divider, Loading, Spacer, Tag, Text } from '@geist-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NewsMasonry from '../components/NewsMasonry';
import { useGetExploreArticlesQuery } from '../store/api/appApi';
import BasePage from './BasePage';

function Explore(req, res) {
    const { data, isError, isLoading } = useGetExploreArticlesQuery();
    const topics = [
        'News',
        'Sport',
        'Tech',
        'World',
        'Finance',
        'Politics',
        'Business',
        'Economics',
        'Entertainment',
        'Beauty',
        'Travel',
        'Music',
        'Food',
        'Science',
        'Gaming',
        'Energy',
    ];
    const topicsForNews = [
        'News',
        'Sport',
        'Tech',
        'Finance',
        'Politics',
        'Business',
        'Entertainment',
        'Science',
    ];
    console.log(data);
    return (
        <BasePage>
            <Text h1 style={{ textAlign: 'center' }}>
                Explore some topics
            </Text>
            <Divider y={0} h={5} />
            <Spacer h={4} />
            <Topics>
                {topics.map((topic) => (
                    <Link to={`/topic/${topic.toLowerCase()}`} key={topic}>
                        <Tag type='dark' invert key={topic}>
                            # {topic}
                        </Tag>
                    </Link>
                ))}
            </Topics>
            <Spacer h={6} />
            <Container>
                {isLoading ? (
                    <>
                        <Loading />
                    </>
                ) : isError ? (
                    <>Error</>
                ) : (
                    <>
                        {topicsForNews.map((topic, index) => {
                            return (
                                <>
                                    <Link
                                        to={`/topic/${topic.toLowerCase()}`}
                                        className='link'>
                                        #{topic.toUpperCase()}
                                    </Link>
                                    <NewsMasonry
                                        articles={data?.topicsNews[index]}
                                    />
                                    <Divider h={3} />
                                </>
                            );
                        })}
                    </>
                )}
            </Container>
        </BasePage>
    );
}

export default Explore;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    a {
        color: black;
    }
    .link {
        color: black;
        font-weight: 700;
        font-size: xx-large;
    }
`;

const Topics = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    max-width: 768px;
    margin: 0 auto;
    justify-content: space-between;
`;
