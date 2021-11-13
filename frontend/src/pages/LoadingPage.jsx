import Spinner from '@geist-ui/react/esm/spinner';
import React from 'react';
import styled from 'styled-components';
import BasePage from './BasePage';

function LoadingPage() {
    return (
        <CenteredPage>
            <Spinner />
        </CenteredPage>
    );
}

export default LoadingPage;

const CenteredPage = styled(BasePage)`
    display: grid;
    place-items: center;
`;
