import { Loading } from '@geist-ui/react';
import React from 'react';
import { useGetArticleCommentsQuery } from '../store/api/appApi';
// import { comments } from '../utils/sampleComments';
import Comment from './Comment';

function Comments({ articleId }) {
    const { data, isLoading } = useGetArticleCommentsQuery(articleId);
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h5>
                <span>{data?.comments?.length}</span> Comment
                {data?.length > 0 ? 's' : ''}
            </h5>

            {data?.comments.length === 0 ? (
                <div>Be the first to comment</div>
            ) : null}

            {data?.comments?.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
}

export default Comments;
