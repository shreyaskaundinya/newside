import { Divider, Image, Text } from '@geist-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
    const topics = ['News', 'Business', 'Sports'];
    const topics1 = ['Tech', 'Crypto', 'Movies'];

    return (
        <FooterContainer id='footer'>
            <div>
                <Logo>
                    <Image
                        src='https://fontmeme.com/permalink/211111/6bd2ba892e332d8478218cbfa438bc2b.png'
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
                            <Link to={`/topic/${topic.toLowerCase()}`}>
                                <Text
                                    p
                                    style={{ fontSize: '0.9em' }}
                                    key={topic}>
                                    # {topic}
                                </Text>
                            </Link>
                        ))}
                    </Col>
                    <Col style={{ paddingTop: '25px', paddingLeft: '6px' }}>
                        {topics1.map((topic) => (
                            <Link to={`/topic/${topic.toLowerCase()}`}>
                                #{topic}
                            </Link>
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
