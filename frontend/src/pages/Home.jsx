import { Button, Divider, Spacer, Text } from '@geist-ui/react';
import React from 'react';
import styled from 'styled-components';
import NewsSlides from '../components/NewsSlides';
import Weather from '../components/Weather';
import BasePage from './BasePage';
import { motion } from 'framer-motion';
import { news } from '../utils/sampleNews';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    return (
        <BasePage>
            <HeroContainer>
                <Text h1 style={{ margin: 0 }}>
                    NewSide : Fast, Quick News For All!
                </Text>
                <Text p>We aggregate news and provide you the summary!</Text>

                <Button type='success' onClick={() => history.push('/auth')}>
                    Create an Account now!
                </Button>
            </HeroContainer>
            <Spacer h={4} />
            <Section>
                <Weather />
            </Section>
            <Spacer h={4} />
            <Section>
                <NewsSlides title='Breaking News' limit={9} articles={news} />
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
