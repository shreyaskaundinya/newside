import Text from '@geist-ui/react/esm/text';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import NewsSlideCard from './NewsSlideCard';

function NewsSlides({ limit = 100, title, articles, type = 'articles' }) {
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
                {type === 'articles' ? (
                    <>
                        {articles.slice(0, limit).map((article) => (
                            <NewsSlideCard article={article} key={article.id} />
                        ))}
                    </>
                ) : (
                    <>
                        {articles.slice(0, limit).map((bookmark) => (
                            <NewsSlideCard
                                article={bookmark.article}
                                key={bookmark._id}
                            />
                        ))}
                    </>
                )}
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
