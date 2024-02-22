import { useEffect } from 'react';
import { setTripListingData } from '../../app/features/tripListingSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TripCardAccordion } from '../../components';
import ActionBarDrawer from '../../components/actionBar/actionBarDrawer/ActionBarDrawer';
import ActionBarTab from '../../components/actionBar/actionBarTab/ActionBarTab';
import LoadMore from '../../components/loadMore/LoadMore';
import { ISeatType, IBusType, ITrip } from '../../types';
import { TripsListingPageWrapper } from './TripsListingPage.styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getTrips } from '../../api';
import { useSearchParams } from 'react-router-dom';

// const dummyData = [
//     {
//         id: '1',
//         origin: 'Trivandrum',
//         destination: 'Kochi',
//         departureTimestamp: '2024-02-01T08:00:00Z',
//         arrivalTimestamp: '2024-02-01T12:00:00Z',
//         seatType: ISeatType.SLEEPER,
//         busType: IBusType.AC,
//         farePerSeat: 50,
//         availableSeats: 20,
//         totalSeats: 30,
//     },
//     {
//         id: '2',
//         origin: 'Trivandrum',
//         destination: 'Kochi',
//         departureTimestamp: '2024-02-01T08:00:00Z',
//         arrivalTimestamp: '2024-02-01T12:00:00Z',
//         seatType: ISeatType.SEATER,
//         busType: IBusType.AC,
//         farePerSeat: 2350,
//         availableSeats: 5,
//         totalSeats: 30,
//     },
//     {
//         id: '3',
//         origin: 'Trivandrum',
//         destination: 'Kochi',
//         departureTimestamp: '2024-02-01T08:00:00Z',
//         arrivalTimestamp: '2024-02-01T12:00:00Z',
//         seatType: ISeatType.SLEEPER,
//         busType: IBusType.NON_AC,
//         farePerSeat: 150,
//         availableSeats: 0,
//         totalSeats: 30,
//     },
//     {
//         id: '4',
//         origin: 'Trivandrum',
//         destination: 'Kochi',
//         departureTimestamp: '2024-02-01T08:00:00Z',
//         arrivalTimestamp: '2024-02-03T12:10:20Z',
//         seatType: ISeatType.SEATER,
//         busType: IBusType.AC,
//         farePerSeat: 23150,
//         availableSeats: 2,
//         totalSeats: 30,
//     },
//     {
//         id: '5',
//         origin: 'Trivandrum',
//         destination: 'Kochi',
//         departureTimestamp: '2024-02-01T08:00:00Z',
//         arrivalTimestamp: '2024-02-01T12:00:00Z',
//         seatType: ISeatType.SLEEPER,
//         busType: IBusType.AC,
//         farePerSeat: 150,
//         availableSeats: 23,
//         totalSeats: 30,
//     },
// ];

const dummyData: ITrip[] = [
    {
        id: '1',
        origin: {
            id: '1',
            name: 'Trivandrum',
            shortCode: 'TVM',
        },
        destination: {
            id: '2',
            name: 'Kochi',
            shortCode: 'KCH',
        },
        departureTimestamp: new Date('2024-02-01T08:00:00Z'),
        arrivalTimestamp: new Date('2024-02-01T12:00:00Z'),
        seatType: ISeatType.SLEEPER,
        busType: IBusType.AC,
        farePerSeat: 50,
        availableSeats: 20,
        totalSeats: 30,
    },
    {
        id: '2',
        origin: {
            id: '1',
            name: 'Trivandrum',
            shortCode: 'TVM',
        },
        destination: {
            id: '2',
            name: 'Kochi',
            shortCode: 'KCH',
        },
        departureTimestamp: new Date('2024-02-01T08:00:00Z'),
        arrivalTimestamp: new Date('2024-02-01T12:00:00Z'),
        seatType: ISeatType.SEATER,
        busType: IBusType.AC,
        farePerSeat: 2350,
        availableSeats: 5,
        totalSeats: 30,
    },
    {
        id: '3',
        origin: {
            id: '1',
            name: 'Trivandrum',
            shortCode: 'TVM',
        },
        destination: {
            id: '2',
            name: 'Kochi',
            shortCode: 'KCH',
        },
        departureTimestamp: new Date('2024-02-01T08:00:00Z'),
        arrivalTimestamp: new Date('2024-02-01T12:00:00Z'),
        seatType: ISeatType.SLEEPER,
        busType: IBusType.NON_AC,
        farePerSeat: 150,
        availableSeats: 0,
        totalSeats: 30,
    },
    {
        id: '4',
        origin: {
            id: '1',
            name: 'Trivandrum',
            shortCode: 'TVM',
        },
        destination: {
            id: '2',
            name: 'Kochi',
            shortCode: 'KCH',
        },
        departureTimestamp: new Date('2024-02-01T08:00:00Z'),
        arrivalTimestamp: new Date('2024-02-03T12:10:20Z'),
        seatType: ISeatType.SEATER,
        busType: IBusType.AC,
        farePerSeat: 23150,
        availableSeats: 2,
        totalSeats: 30,
    },
];

export const TripsListingPage = () => {
    const state = useAppSelector((state) => state.tripListing);

    //testing store updating
    const paramsFromStore = useAppSelector((state) => state.busSearch);
    console.log('paramsFromStore', paramsFromStore);

    const dispatch = useAppDispatch();
    const matches = useMediaQuery('(min-width:600px)');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // when filters and sort states in store change, a fetch must me called
        const start = searchParams.get('originID');
        const dest = searchParams.get('destinationID');
        const date = searchParams.get('tripDate');

        if (start && dest && date) {
            getTrips({
                originId: start,
                destinationId: dest,
                tripDate: date,
                page: 1,
                pageSize: 5,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    dispatch(setTripListingData(dummyData));

    return (
        <TripsListingPageWrapper>
            {matches ? <ActionBarTab showFilterSort /> : <ActionBarDrawer />}
            {state.map((indData) => (
                <TripCardAccordion key={indData.id} data={indData} />
            ))}
            <LoadMore />
        </TripsListingPageWrapper>
    );
};
