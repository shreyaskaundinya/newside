import { Avatar, Button, Divider, Drawer, Spacer, Text } from '@geist-ui/react';
import AlignJustify from '@geist-ui/react-icons/alignJustify';
import Image from '@geist-ui/react/esm/image/';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../store/slices/userSlice';
import { mediaQuery } from '../utils/mediaQuery';
// import useResponsiveWindow from '../hooks/useResponsiveWindow';

function Navbar() {
    const [state, setState] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [placement, setPlacement] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 475);
    // const { isMobile } = useResponsiveWindow();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const open = (text) => {
        setPlacement(text);
        setState(true);
    };

    const history = useHistory();

    const handleSearchBar = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        history.push(`/results/${searchTerm.split(' ').join('-')}`);
    };

    return (
        <NavbarContainer>
            <Nav>
                <Logo>
                    <AlignJustify onClick={() => open('left')} />
                    <Image
                        src='https://fontmeme.com/permalink/211111/6bd2ba892e332d8478218cbfa438bc2b.png'
                        width={!isMobile ? '50px' : '40px'}
                        style={{ margin: 0 }}
                    />
                    <Text
                        p
                        style={{
                            margin: 0,
                            color: 'white',
                            fontSize: '1.4em',
                        }}>
                        <strong>NewSide</strong>
                    </Text>
                </Logo>
                {user ? (
                    <User>
                        <Avatar text={user.username[0]} />
                        {!isMobile ? (
                            <Text p style={{ color: 'white' }}>
                                {user.username}
                            </Text>
                        ) : (
                            <></>
                        )}
                    </User>
                ) : (
                    <></>
                )}
            </Nav>
            <StyledDrawer
                visible={state}
                onClose={() => setState(false)}
                placement={placement}>
                <StyledDrawer.Title style={{ margin: 0, color: 'white' }}>
                    Newside
                </StyledDrawer.Title>
                <StyledDrawer.Content>
                    <NavItems>
                        <Text p>
                            <StyledNavLink to='/' activeClassName='active'>
                                Home
                            </StyledNavLink>
                        </Text>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Text p>
                            <StyledNavLink
                                to='/explore'
                                activeClassName='active'>
                                Explore
                            </StyledNavLink>
                        </Text>

                        <Divider style={{ backgroundColor: 'white' }} />
                        <Text p>
                            <StyledNavLink to='/me' activeClassName='active'>
                                Profile
                            </StyledNavLink>
                        </Text>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Text p>
                            <StyledNavLink
                                to='/bookmarks'
                                activeClassName='active'>
                                Bookmarks
                            </StyledNavLink>
                        </Text>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Spacer h={4} />
                        <Button
                            type={user ? 'error-light' : 'success-light'}
                            width={'100%'}
                            onClick={() => {
                                dispatch(logout());
                                history.push('/auth');
                            }}>
                            {user ? 'Logout' : 'Login'}
                        </Button>
                    </NavItems>
                </StyledDrawer.Content>
            </StyledDrawer>
        </NavbarContainer>
    );
}

export default Navbar;

const StyledDrawer = styled(Drawer)`
    background-color: black !important;
    color: white !important;
    min-width: 400px;
    ${mediaQuery('sm')} {
        min-width: unset;
        max-width: 250px !important;
    }
`;

const NavbarContainer = styled.div`
    position: sticky;
    top: 1%;
    width: 99%;
    margin: 0 auto;
    background-color: black;
    color: white;
    z-index: 1000;
    border-radius: 5px;
    ${mediaQuery('sm')} {
        width: 96%;
    }
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;

    ${mediaQuery('sm')} {
        gap: 1rem;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1rem;

    ${mediaQuery('sm')} {
        padding: 0.5rem 1rem;
    }
    /* box-shadow: 1px 1px 1px 1px lightgray; */
`;

const NavItems = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    &:hover {
    }
`;
