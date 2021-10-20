import React ,{useEffect, useState}from 'react'
import { Breadcrumb,SimpleCard } from 'app/components'
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
  DialogActions,
  Button,
} from '@mui/material'
import axios from 'axios'

const ListInventory = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [modal, setModal] = useState(false)
  const [inventario,setInventario]=useState(null)
  const [serie,setSerie]=useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const[producto,setProducto]=useState(null)


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleOpenModal=(id,nombre)=>{
    listarSeries(id);
    setProducto(nombre);
    setModal(true);
  }
  const handleCloseModal=()=>{
    setModal(false);
  }
  useEffect(()=>{
    listarInventario();
  },[])

  const listarInventario=()=>{
    setInventario(null);
    setIsLoading(true)
    axios.get(`http://localhost:5000/api-admin/inventario/getInventarios`).then(
      (response) => {
        setInventario(response.data.inventarioslist)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
        setIsLoading(false)
        setIsError(true)
      }
    )
  }
  const listarSeries=(id)=>{
    setSerie(null);
    setIsLoading(true)
    axios.get(`http://localhost:5000/api-admin/inventario/getSeriesByProductId/`+id).then(
      (response) => {
        setSerie(response.data.nSeries)
        console.log(serie)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
        setIsLoading(false)
      }
    )
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }


  return (
    <>
    {!isLoading && !isError && (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Inventario' }]} />
      </div>
      <SimpleCard title={`${inventario?.length} productos en el inventario`}>
        <Table className="whitespace-pre">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">SKU</TableCell>
              <TableCell className="px-0" colSpan="2px">Nombre del Producto</TableCell>
              <TableCell className="px-0">Cantidad</TableCell>
              <TableCell className="px-0">Marca</TableCell>
              <TableCell className="px-0">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventario &&
            inventario
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inv, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">
                    {inv.sku}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left"  colSpan="2px">
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
                      <IconButton size="large" onClick={()=>handleOpenModal(inv.productoID,inv.nombre)}>
                        <Icon color="primary" >visibility</Icon>
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
          count={inventario.length}
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
    )}
    {!isLoading && !isError && (
    <Dialog
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={modal}
          onClose={handleCloseModal}
        >
          <SimpleCard>
            <DialogTitle>{producto}</DialogTitle>
            <DialogContent>
              <Table className="whitespace-pre">
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0">Numero de Serie</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serie?.map((s, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-0 capitalize" align="left">
                        {s}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>
                Cerrar
              </Button>
            </DialogActions>
          </SimpleCard>
        </Dialog>
        )}
    </>
  )
}

export default ListInventory
