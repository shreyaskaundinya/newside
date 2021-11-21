import { Card, Text } from '@geist-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Topics() {
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
    return (
        <Card>
            <Card.Content>
                <Text h3 style={{ textAlign: 'center' }}>
                    Explore Topics
                </Text>
            </Card.Content>
            <Card.Content>
                {topics.map((topic) => (
                    <Text p style={{ textTransform: 'capitalize' }} key={topic}>
                        <Link to={`/topic/${topic.toLowerCase()}`}>
                            # {topic}
                        </Link>
                    </Text>
                ))}
            </Card.Content>
        </Card>
    );
}

export default Topics;
