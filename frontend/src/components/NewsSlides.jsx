import React from 'react';
import styled from 'styled-components';
import { news } from '../utils/sampleNews';
import NewsSlideCard from './NewsSlideCard';
import { motion } from 'framer-motion';
import Text from '@geist-ui/react/esm/text';

function NewsSlides({ limit = 100, title, articles }) {
    return (
        <>
            <Text h4>{title}</Text>
            <SlidesContainer
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 1.5,
                    duration: 0.5,
                    staggerChildren: 0.3,
                }}>
                {articles.slice(0, limit).map((article) => (
                    <NewsSlideCard article={article} key={article.id} />
                ))}
            </SlidesContainer>
        </>
    );
}

export default NewsSlides;

const SlidesContainer = styled(motion.div)`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 2rem 0;
`;
