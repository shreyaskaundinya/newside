import { Button, Card, Tag, Text } from '@geist-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Bookmark, Paperclip } from '@geist-ui/react-icons';
function NewsMasonryCard({ article }) {
    return (
        <Card hoverable shadow>
            <Image>
                <img src={article.media} alt={article.title} />
            </Image>
            {/* <Divider y={0} /> */}
            <Card.Content>
                <Text p>
                    <Link to={`/article/${article._id}`}>
                        <strong>{article.title}</strong>
                    </Link>
                </Text>
            </Card.Content>
            <Card.Footer style={{ textAlign: 'justify' }}>
                <Footer>
                    <Button
                        type='success'
                        auto
                        icon={<Bookmark />}
                        scale={1 / 2}>
                        Save
                    </Button>
                    <Button
                        type='warning'
                        auto
                        scale={1 / 2}
                        iconRight={<Paperclip />}
                    />
                    <Tag type='success'>{article.topic}</Tag>
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
