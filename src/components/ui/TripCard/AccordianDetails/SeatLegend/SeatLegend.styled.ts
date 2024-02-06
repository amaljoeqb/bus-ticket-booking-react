import styled from '@emotion/styled';

const SeatLegendWrapper = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',

    li: {
        ul: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            listStyle: 'none',
        },
    },
    'li:first-of-type': {
        ul: {
            padding: 0,
        },
    },

    '.seat': {
        boxShadow: `0 0 4px ${theme.color.boxShadowPrimary}`,
    },

    '.title': {
        marginLeft: '15px',
    },
}));

export default SeatLegendWrapper;
