import React from 'react'
import {SimpleCard } from 'app/components'
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  Tooltip,
  TablePagination,
} from '@material-ui/core'

const ListOrder=[
  {
    codigo: '0001',
    proveedor: '#Prov01',
    cantidad: 20,
    costo: 1000,
    fecha: "20/11/21",
    estado: 'Generado',
  },
  {
    codigo: '0002',
    proveedor: '#Prov02',
    cantidad: 15,
    costo: 2546,
    fecha: "20/11/21",
    estado: 'Procesado',
  },
  {
    codigo: '0003',
    proveedor: '#Prov03',
    cantidad: 5,
    costo: 8500,
    fecha: "15/08/21",
    estado: 'Finalizado',
  },
]

const ListPurchaseOrder = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <div className="m-sm-30">
      <SimpleCard title={'Gestionar Orden de Compra'}>
        <Table className="whitespace-pre">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">Codigo</TableCell>
              <TableCell className="px-0">Proveedor</TableCell>
              <TableCell className="px-0">Cantidad</TableCell>
              <TableCell className="px-0">Costo</TableCell>
              <TableCell className="px-0">Fecha de Entrega</TableCell>
              <TableCell className="px-0">Estado</TableCell>
              <TableCell className="px-0">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListOrder
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">
                    {order.codigo}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {order.proveedor}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {order.cantidad}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {order.costo}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {order.fecha}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {order.estado}
                  </TableCell>
                  <TableCell className="px-0">
                    <Tooltip title="Visualizar pedido">
                      <IconButton>
                        <Icon color="primary">visibility</Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          className="px-4"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ListOrder.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </SimpleCard>
    </div>
  )
}

export default ListPurchaseOrder
