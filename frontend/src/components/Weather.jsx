import { Card, Loading, Text, useToasts } from '@geist-ui/react';
import Image from '@geist-ui/react/esm/image/';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import Datetime from 'react-datetime';
import styled from 'styled-components';
import { useGetWeatherDataQuery } from '../store/api/appApi';
import { mediaQuery } from '../utils/mediaQuery';

function Weather(props) {
    const [toast, setToast] = useToasts();
    const user = useSelector((state) => state.user.user);
    // making the query to weather api

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const { data, isLoading, isError, error } =
        useGetWeatherDataQuery(location);

    useEffect(() => {
        if (isError) {
            setToast({ text: error.err, type: 'error' });
        }
    }, []);

    useEffect(() => {
        const loc = localStorage.getItem('location');
        // console.log('LOCATION ::::::::::: ', loc);
        if (loc) {
            setLocation(() => JSON.parse(loc));
        } else if (!user?.location?.latitude) {
            navigator.geolocation.getCurrentPosition((e) => {
                setLocation(() => ({
                    latitude: e.coords.latitude,
                    longitude: e.coords.longitude,
                }));
                localStorage.setItem(
                    'location',
                    JSON.stringify({
                        latitude: e.coords.latitude,
                        longitude: e.coords.longitude,
                    })
                );
            });
        }
    }, [user]);

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                delay: 1,
                duration: 0.5,
            }}>
            <Card shadow>
                <Card.Content>
                    {isLoading ? (
                        <>
                            <Loading />
                        </>
                    ) : isError ? (
                        <>Error</>
                    ) : (
                        <>
                            <WeatherStyle>
                                <div id='location'>
                                    <h3>{data?.weatherdata.region}</h3>
                                </div>
                                <WeatherDayCard>
                                    <Text h2>
                                        <strong>
                                            {data?.weatherdata.temp}° C
                                        </strong>
                                    </Text>
                                    <Flex>
                                        <Image
                                            src={data?.weatherdata.icon}
                                            alt='Weather Icon'
                                            width='50px'
                                            height='50px'
                                        />
                                        <Text span>
                                            <strong>
                                                {data?.weatherdata.condition}
                                            </strong>
                                        </Text>
                                    </Flex>
                                    <Text h2>
                                        {data?.weatherdata.windSpeed} kph
                                    </Text>
                                </WeatherDayCard>
                            </WeatherStyle>
                        </>
                    )}
                </Card.Content>
            </Card>
        </motion.div>
    );
}

export default Weather;

const WeatherStyle = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    ${mediaQuery('sm')} {
        #location {
            width: 100%;
            text-align: center;
        }
    }
`;

const WeatherDayCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    * {
        width: max-content;
    }
    gap: 2rem;
    justify-content: space-around;

    ${mediaQuery('sm')} {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: max-content;
`;
