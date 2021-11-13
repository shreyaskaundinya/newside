import { Loading } from '@geist-ui/react';
import React from 'react';
import styled from 'styled-components';
import { news } from '../utils/sampleNews';
import NewsMasonryCard from './NewsMasonryCard';

function NewsMasonry({ articles, isLoading, isError }) {
    return (
        <Grid>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <>Error</>
            ) : (
                articles.map((article) => (
                    <NewsMasonryCard article={article} key={article._id} />
                ))
            )}
        </Grid>
    );
}

export default NewsMasonry;

const Grid = styled.div`
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: masonry;
    width: 100%;
`;
