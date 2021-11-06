import React from 'react';
import { Text, Divider, Link, Image } from '@geist-ui/react';
import styled from 'styled-components';

function Footer() {
    const topics = ['News', 'Business', 'Sports'];
    const topics1 = ['Tech', 'Crypto', 'Movies'];

    return (
        <FooterContainer>
            <div>
                <Logo>
                    <Image
                        src='https://fontmeme.com/permalink/211102/f10cb435a58b8d131a961b0b8f1c3feb.png'
                        width='50px'
                    />
                </Logo>

                <Divider y={0} h={2} />

                <Row>
                    <Col>
                        <Text p>
                            <strong>LINKS</strong>
                        </Text>
                        <Text p style={{ fontSize: '0.9em' }}>
                            <Link>About us</Link>
                        </Text>
                        <Text p style={{ fontSize: '0.9em' }}>
                            <Link>Privacy Policy </Link>
                        </Text>
                    </Col>
                    <Col>
                        <Text style={{ paddingLeft: '50px' }}>
                            <strong>TRENDING TOPICS</strong>
                        </Text>
                        {topics.map((topic) => (
                            <Text p style={{ fontSize: '0.9em' }} key={topic}>
                                <Link to={`/topic/${topic.toLowerCase()}`}>
                                    # {topic}
                                </Link>
                            </Text>
                        ))}
                    </Col>
                    <Col style={{ paddingTop: '25px', paddingLeft: '6px' }}>
                        {topics1.map((topic) => (
                            <Text p style={{ fontSize: '0.9em' }} key={topic}>
                                <Link to={`/topic/${topic.toLowerCase()}`}>
                                    # {topic}
                                </Link>
                            </Text>
                        ))}
                    </Col>
                </Row>
            </div>
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.div`
    width: 100%;
    background-color: black;
    color: white;
    padding: 2rem 0;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin: 0 auto;
    max-width: 500px;
    flex-wrap: wrap;
`;

const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    p {
        margin: 0;
    }
`;

const Logo = styled.div`
    padding-bottom: 1rem;
    display: flex;
`;
