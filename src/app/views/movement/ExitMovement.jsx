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

const salida=[
  {
    producto:'Laptop Lenovo V15 IIL',
    cliente:'Juan Quispe',
    estado:'reservado',
    cantidad:1,
    fecharetiro:'09/08/2021',
  },
  {
    producto:'TECLADO LOGITECH K120 USB',
    cliente:'Carlos Hernandez',
    estado:'reservado',
    cantidad:7,
    fecharetiro:'10/10/2021',
  },
  {
    producto:'Auricular Gaming LENOVO LEGION H300',
    cliente:'Hugo Aguilar',
    estado:'reservado',
    cantidad:2,
    fecharetiro:'12/10/2021',
  },
]
const ExitMovement = () => {
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
              <Breadcrumb routeSegments={[{ name: 'Productos en Salida' }]} />
            </div>
            <SimpleCard
              title={`${salida?.length} productos saliendo`}
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
                      Fecha de Retiro
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salida &&
                    salida
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((s, index) => (
                        <TableRow key={index}>
                          <TableCell className="px-0 capitalize" colSpan={3}>
                            {s.producto}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={2}>
                            {s.cliente}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={2}>
                            {s.estado}
                          </TableCell>
                          <TableCell className="px-0 capitalize" colSpan={1}>
                            {s.cantidad}
                          </TableCell>
                          <TableCell className="px-0" colSpan={2}>
                            {s.fecharetiro}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
              <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={salida.length}
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

export default ExitMovement
