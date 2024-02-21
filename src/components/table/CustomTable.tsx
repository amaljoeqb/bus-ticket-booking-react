import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { IPagination } from '../../types/pagination';
import { CustomTableWrapper } from './CustomTable.styled';
import CustomToolbar from './CustomToolbar';
import CustomPagination from './CustomPagination';
import CustomNoRowsOverlay from './CustomNoRowsOverlay/CustomNoRowsOverlay';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

export interface ICustomTable<T> {
    pageState: IPagination<T>;
    updatePageState: (pageState: Partial<IPagination<T>>) => void;
    updateSearchParams: (newPage: string) => void;
    rowId: keyof T;
    columns: GridColDef[];
    t: TFunction;
}

export const CustomTable = <T,>({
    pageState,
    updatePageState,
    updateSearchParams,
    columns,
    rowId,
    t,
}: ICustomTable<T>) => {
    const { t: tExport } = useTranslation('tableExportOptions');
    return (
        <CustomTableWrapper>
            <DataGrid
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    px: '3rem',
                }}
                rows={pageState.data}
                rowCount={pageState.totalNumberOfData}
                getRowId={(row: T) => String(row[rowId])}
                columns={columns.map((column) => ({
                    ...column,
                    headerClassName: 'custom-header',
                    flex: 1,
                    sortable: false,
                }))}
                autoHeight={true}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 10,
                        },
                    },
                }}
                pagination
                paginationModel={{
                    page: pageState.page,
                    pageSize: pageState.pageSize,
                }}
                loading={pageState.loading}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableColumnMenu
                onPaginationModelChange={(newPaginationModel) => {
                    updatePageState(newPaginationModel);
                }}
                localeText={{
                    toolbarExport: tExport('export'),
                    toolbarExportCSV: tExport('exportAsCsv'),
                    toolbarExportPrint: tExport('exportPrint'),
                }}
                slots={{
                    toolbar: CustomToolbar,
                    pagination: () => (
                        <CustomPagination
                            totalRows={pageState.totalNumberOfData}
                            updateSearchParams={updateSearchParams}
                            t={t}
                        />
                    ),
                    loadingOverlay: LinearProgress,
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
            />
        </CustomTableWrapper>
    );
};
