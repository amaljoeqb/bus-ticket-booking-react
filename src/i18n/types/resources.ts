import data from '../locales/en/en.json';

const {
    ns1,
    ns2,
    headerFooter,
    seatLayout,
    tripDetails,
    passengerDetails,
    actionBarTab,
    actionBar,
    pnrSearch,
    filterSort,
    tripListing,
    auth,
    bookingsList,
    usersList,
    tableNoRowsOverlay,
    tableExportOptions,
    landingPage,
    bookingPageConfirmation,
    logoutConfirmationModal,
    error,
} = data;

const resources = {
    ns1,
    ns2,
    headerFooter,
    seatLayout,
    actionBarTab,
    actionBar,
    pnrSearch,
    filterSort,
    tripDetails,
    bookingsList,
    tripListing,
    usersList,
    tableExportOptions,
    tableNoRowsOverlay,
    landingPage,
    auth,
    passengerDetails,
    logoutConfirmationModal,
    error,
    bookingPageConfirmation,
} as const;

export default resources;
