import data from '../locales/en/en.json';

const { ns1, ns2, headerFooter, seatLayout, tripDetails } = data;
const resources = {
    ns1,
    ns2,
    headerFooter,
    seatLayout,
    tripDetails,
} as const;

export default resources;
