import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
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
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'

const ListInventory = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const inventarioL = [
    {
      SKU: '1231123',
      nombre: 'Lapop Lenovo iCore5',
      cantidad: 3,
      marca: 'Ecma',
    },
    {
      SKU: '1231123',
      nombre: 'Lapop Lenovo iCore5',
      cantidad: 3,
      marca: 'Ecma',
    },
    {
      SKU: '1231123',
      nombre: 'Lapop Lenovo iCore5',
      cantidad: 3,
      marca: 'Ecma',
    },
  ]
  const serie = [
    {
      nombre: 'Lapop Lenovo iCore5',
      nro: [123123, 234234],
    },
  ]
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Inventario' }]} />
      </div>
      <SimpleCard title={`${inventarioL.length} productos en el inventario`}>
        <Table className="whitespace-pre">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">SKU</TableCell>
              <TableCell className="px-0">Nombre del Producto</TableCell>
              <TableCell className="px-0">Cantidad</TableCell>
              <TableCell className="px-0">Marca</TableCell>
              <TableCell className="px-0">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventarioL
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inv, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">
                    {inv.SKU}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {inv.nombre}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {inv.cantidad}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {inv.marca}
                  </TableCell>
                  <TableCell className="px-0">
                    <Tooltip title="Visualizar pedido">
                      <IconButton size="large">
                        <Icon color="primary">visibility</Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <SimpleCard>
            <DialogTitle>Lapop Lenovo iCore5</DialogTitle>
            <DialogContent>
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0">imagen</TableCell>
                    <TableCell className="px-0">Nombre de Serie</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serie.map((s, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-0 capitalize" align="left">
                        <img
                          alt={s.nro}
                          src="https://omnitechperu.com/data/cache/thum_21256nblen81yh00mwlm.jpg"
                        />
                      </TableCell>
                      <TableCell className="px-0 capitalize" align="left">
                        {s.nro}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </SimpleCard>
        </Dialog>
        <TablePagination
          className="px-4"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={inventarioL.length}
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

export default ListInventory
