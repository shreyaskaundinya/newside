import React, { useEffect, useRef, useState } from 'react';
import BasePage from './BasePage';
import NewsMasonry from '../components/NewsMasonry';
import { Divider, Loading, Text } from '@geist-ui/react';
import { useParams } from 'react-router-dom';
import { useGetArticlesByTopicQuery } from '../store/api/appApi';
import useIntersectionObs from '../hooks/useIntersectionObs';

function TopicNews() {
    const { topic } = useParams();
    const [params, setParams] = useState({
        topic: topic,
        page: 0,
    });

    const { data, isLoading, isError, isFetching } =
        useGetArticlesByTopicQuery(params);

    const end = useRef(null);
    const { observed } = useIntersectionObs({ ref: end, threshold: 1 });

    useEffect(() => {
        console.log('page added', params.page);
    }, [params]);

    useEffect(() => {
        if (observed) {
            setParams((params) => ({ ...params, page: params.page + 1 }));
        }
    }, [observed]);

    return (
        <BasePage>
            <Text h1>#{topic.toUpperCase()}</Text>
            <Divider y={0} style={{ marginBottom: '2rem' }} />
            <NewsMasonry
                articles={data?.articles}
                isLoading={isLoading}
                isError={isError}></NewsMasonry>
            <div id='end' style={{ width: '100%', height: '10px' }} ref={end}>
                {isFetching || isLoading ? <Loading /> : <></>}
            </div>
        </BasePage>
    );
}

export default TopicNews;
