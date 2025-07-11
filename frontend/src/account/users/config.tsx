import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellidos', width: 130 },
    { field: 'email', headerName: 'Correo', width: 130 },
    { field: 'country', headerName: 'Estado', width: 130 },
    {
        field: 'birth',
        headerName: 'Fecha de Nacimiento',
        type: 'number',
        width: 150,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'actions',
        headerName: 'Acciones',
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => (
            <>
                <Link to={`/users/${params.row.id}/edit`} state={{
                    user: params.row
                }}>
                    <IconButton color="warning" aria-label="Editar">
                        <EditIcon/>
                    </IconButton>
                </Link>
                <Link to={`/users/${params.row.id}/delete`}>
                    <IconButton color="error" aria-label="Eliminar">
                        <DeleteIcon/>
                    </IconButton>
                </Link>
            </>
        ),
    },
];

export default columns;