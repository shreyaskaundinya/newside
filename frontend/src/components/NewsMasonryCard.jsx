import { Button, Card, Tag, Text, useToasts, Link } from '@geist-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Bookmark, Paperclip } from '@geist-ui/react-icons';
import { useUpdateBookmarkMutation } from '../store/api/appApi';
import { updateBookmark } from '../store/slices/userSlice';
import { find } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

function NewsMasonryCard({ article }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [toast, setToast] = useToasts();

    // console.log(article);

    const isBookmarked = useSelector((state) => {
        return find(state.user.bookmarks, { articleId: article._id })
            ? true
            : false;
    });
    // console.log(isBookmarked);

    const [updateBookmarkInDb, { isLoading: updateBookmarkLoading }] =
        useUpdateBookmarkMutation();

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

    return (
        <Card hoverable shadow>
            <Image>
                <img src={article.media} alt={article.title} />
            </Image>
            {/* <Divider y={0} /> */}
            <Card.Content>
                <Text p>
                    <RouterLink to={`/article/${article._id}`}>
                        <strong>{article.title}</strong>
                    </RouterLink>
                </Text>
            </Card.Content>
            <Card.Footer style={{ textAlign: 'justify' }}>
                <Footer>
                    <Button
                        type='success'
                        auto
                        icon={<Bookmark />}
                        scale={1 / 2}
                        onClick={handleUpdateBookmark}
                        loading={updateBookmarkLoading}>
                        {isBookmarked ? 'Unsave' : 'Save'}
                    </Button>
                    <Button
                        type='warning'
                        auto
                        scale={1 / 2}
                        iconRight={<Paperclip />}>
                        <Link href={article.link} target='_blank'>
                            Open Article
                        </Link>
                    </Button>
                    <Tag type='success'>
                        <RouterLink
                            to={`/topic/${article.topic.toLowerCase()}`}>
                            {article.topic}
                        </RouterLink>
                    </Tag>
                </Footer>
            </Card.Footer>
        </Card>
    );
}

export default NewsMasonryCard;

const Image = styled.div`
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    overflow: hidden;
    height: 200px;
    img {
        object-fit: cover;
    }
`;

const Footer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: auto;
`;
