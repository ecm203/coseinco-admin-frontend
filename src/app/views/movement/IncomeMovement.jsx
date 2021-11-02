import React,{useState} from 'react'
import {
  Breadcrumb,
  SimpleCard,
} from 'app/components'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material'

const ingreso=[
  {
    producto:'Monitor Curvo Gamer Teros TE-3174N',
    proveedor:'ASUS',
    estado:'habilitado',
    cantidad:4,
    fechaingreso:'10/09/2021',
  },
  {
    producto:'PLACA ASUS PRIME B365M-A 1151',
    proveedor:'ASUS',
    estado:'habilitado',
    cantidad:4,
    fechaingreso:'10/09/2021',
  },
  {
    producto:'Laptop Lenovo V15 IIL',
    proveedor:'Lenovo',
    estado:'habilitado',
    cantidad:2,
    fechaingreso:'10/09/2021',
  },
]

const IncomeMovement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb routeSegments={[{ name: 'Productos en Ingreso' }]} />
            </div>
            <SimpleCard
              title={`${ingreso?.length} productos ingresados`}
            >
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" colSpan={3}>
                      Producto
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      Proveedor
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      Estado
                    </TableCell>
                    <TableCell className="px-0" colSpan={1}>
                      Cantidad
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      Fecha de Ingreso
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingreso &&
                    ingreso
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((i, index) => (
                        <TableRow key={index}>
                          <TableCell className="px-0 capitalize" colSpan={3}>
                            {i.producto}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={2}>
                            {i.proveedor}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={2}>
                            {i.estado}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={1}>
                            {i.cantidad}
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            {i.fechaingreso}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
              <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={ingreso.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </SimpleCard>
    </div>
  )
}

export default IncomeMovement
