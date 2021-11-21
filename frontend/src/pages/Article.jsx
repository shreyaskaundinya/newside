import {
    Button,
    Card,
    Divider,
    Input,
    Link,
    Text,
    useToasts,
} from '@geist-ui/react';
import { Bookmark, Globe, Send } from '@geist-ui/react-icons';
import { find } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Topics from '../components/Topics';
import {
    useAddArticleCommentMutation,
    useGetArticlebyIdQuery,
    useUpdateBookmarkMutation,
} from '../store/api/appApi';
import { addComment } from '../store/slices/articlesSlice';
import { updateBookmark } from '../store/slices/userSlice';
import BasePage from './BasePage';

function Article() {
    const { id } = useParams();
    const commentform = useRef();
    const [toast, setToast] = useToasts();

    // redux -------------

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const articleData = useSelector((state) =>
        state.articles.articles.find((a) => a.articleId === id)
    );

    const isBookmarked = useSelector((state) => {
        // console.log(find(state.user.bookmarks, { _id: id }));
        return find(state.user.bookmarks, { articleId: id }) ? true : false;
    });

    const [article, setArticle] = useState(articleData);

    const {
        data: articleFromDb,
        isFetching,
        isError,
        isSuccess,
    } = useGetArticlebyIdQuery(id);

    const [updateBookmarkInDb, { isLoading: updateBookmarkLoading }] =
        useUpdateBookmarkMutation();

    const [addArticleComment, { isLoading }] = useAddArticleCommentMutation();

    // ------------------

    useEffect(() => {
        setArticle(() => (articleData ? articleData : articleFromDb?.article));
    }, [isSuccess, isFetching, articleData, articleFromDb]);

    useEffect(() => {
        console.log(isBookmarked);
    }, [isBookmarked]);

    // event handlers -----------------

    const handleAddComment = async (e) => {
        e.preventDefault();

        try {
            const data = {
                userId: user._id,
                username: user.username,
                articleId: article._id,
                comment: new FormData(commentform.current).get('comment'),
            };
            const comment = await addArticleComment(data);
            dispatch(addComment(data));
        } catch (error) {
            setToast({ text: `Error : ${error.message}`, type: 'error' });
        }
    };

    const handleUpdateBookmark = async () => {
        if (user && article) {
            const resp = await updateBookmarkInDb({
                userId: user._id,
                articleId: article._id,
            });
            // console.log(resp.data.data);
            dispatch(updateBookmark(resp.data.data));
        } else {
            setToast({ text: 'Please Login to Continue', type: 'error' });
        }
    };

    const datestring = new Date(article?.published_date).toDateString();

    return (
        <BasePage>
            {article ? (
                <>
                    <Container>
                        <Card style={{ flex: 1 }}>
                            <Card.Content>
                                <img src={article.media} alt='' />
                                <Text h2 style={{ textAlign: 'center' }}>
                                    {article.title}
                                </Text>
                                <Byline>
                                    <div>
                                        <Text p>
                                            <strong>By : </strong>
                                            {article.author
                                                ? article.author
                                                : '---'}
                                        </Text>
                                        <Text p>
                                            <strong>Published On : </strong>

                                            {datestring}
                                        </Text>
                                    </div>
                                    <Actions>
                                        <Button
                                            type='warning'
                                            ghost
                                            icon={<Globe />}
                                            scale={0.85}>
                                            <Link
                                                href={article.link}
                                                target='_blank'>
                                                Original Article
                                            </Link>
                                        </Button>
                                        <Button
                                            type='success'
                                            icon={<Bookmark />}
                                            scale={0.85}
                                            onClick={handleUpdateBookmark}
                                            loading={updateBookmarkLoading}>
                                            {isBookmarked
                                                ? 'Unsave'
                                                : 'Bookmark'}
                                        </Button>
                                    </Actions>
                                </Byline>
                            </Card.Content>

                            <Divider y={0} />

                            <Card.Content>
                                <Text p>
                                    <strong>Summary : </strong>
                                </Text>
                                <Text p>{article.summary}</Text>
                            </Card.Content>

                            <Card.Footer>
                                <NewsComments>
                                    <CommentFormContainer>
                                        <Text p>
                                            <strong>Add a comment</strong>
                                        </Text>
                                        <CommentForm
                                            method='POST'
                                            onSubmit={handleAddComment}
                                            ref={commentform}>
                                            <Input
                                                placeholder='Comment'
                                                width={'100%'}
                                                name='comment'
                                            />

                                            <Button
                                                type='success'
                                                icon={<Send />}
                                                auto
                                                htmlType='submit'
                                                loading={isLoading}>
                                                Comment
                                            </Button>
                                        </CommentForm>
                                    </CommentFormContainer>
                                    <Comments articleId={article._id ?? id} />
                                </NewsComments>
                            </Card.Footer>
                        </Card>
                        <Topics />
                    </Container>
                </>
            ) : (
                <>
                    {isLoading ? <>Loading...</> : isError ? <>Error</> : <></>}
                </>
            )}
        </BasePage>
    );
}

export default Article;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
`;
const Byline = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;
`;

const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
`;

const CommentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
`;

const CommentForm = styled.form`
    display: flex;
    gap: 1rem;
`;

const NewsComments = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
`;
