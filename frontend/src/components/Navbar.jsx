import {
    Avatar,
    Button,
    Divider,
    Drawer,
    Input,
    Spacer,
    Text,
} from '@geist-ui/react';
import React, { useState } from 'react';
import AlignJustify from '@geist-ui/react-icons/alignJustify';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { Search } from '@geist-ui/react-icons';
import Image from '@geist-ui/react/esm/image/';
import { mediaQuery } from '../utils/mediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
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
                        src='https://fontmeme.com/permalink/211102/f10cb435a58b8d131a961b0b8f1c3feb.png'
                        width={!isMobile ? '50px' : '40px'}
                        style={{ margin: 0 }}
                    />
                    <Text
                        p
                        style={{
                            margin: 0,
                            color: 'white',
                            fontSize: isMobile ? '1em' : '1.4em',
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
                <StyledDrawer.Title>
                    <Text h3 style={{ margin: 0, color: 'white' }}>
                        NewSide
                    </Text>
                </StyledDrawer.Title>
                <StyledDrawer.Content>
                    <Input
                        scale={4 / 3}
                        placeholder='Search for topics...'
                        width='100%'
                        clearable
                        onChange={handleSearchBar}
                        style={{ color: 'white' }}
                        iconRight={<Search />}
                        iconClickable
                        onIconClick={handleSearch}
                        type='success'
                    />
                    <NavItems>
                        <Spacer h={3} />
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
                        <Text p>
                            <StyledNavLink
                                to='/aboutus'
                                activeClassName='active'>
                                About Us
                            </StyledNavLink>
                        </Text>
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
    ${mediaQuery('sm')} {
        max-width: 250px !important;
    }
`;

const NavbarContainer = styled.div`
    position: sticky;
    top: 1%;
    width: 99%;
    margin: 0.5% auto;
    background-color: black;
    color: white;
    z-index: 1000;
    border-radius: 5px;
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
