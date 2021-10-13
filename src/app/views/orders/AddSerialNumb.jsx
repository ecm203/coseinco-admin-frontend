import React, { useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Icon,
  Grid,
} from '@material-ui/core'
import SerialNumber from './SerialNumber'
import { useParams } from 'react-router'

const productList = [
  {
    product: 'Monitor MSI 32" 144hz',
    sku: '6787AD8',
    quantity: 645,
  },
  {
    product: 'Memoria Ram Kingston 8gb 3200Mhz',
    sku: '6787AD8',
    quantity: 645,
    serie: 'FDA4654WEFW',
  },
]

const AddSerialNumb = () => {
  const [serialNumber, setSerialNumberOpen] = useState(false)
  const { orderNum } = useParams()

  const handlerSerialNumberOpen = () => {
    setSerialNumberOpen(true)
  }

  const handlerSerialNumberClose = () => {
    setSerialNumberOpen(false)
  }
  return (
    <>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: 'Reservar pedido', path: '/pedidos/reservar' },
              { name: 'Pedido: ' + orderNum },
            ]}
          />
        </div>
        <div className="mb-sm-30">
          <SimpleCard title={'Datos del cliente'}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  disabled
                  className="mb-5"
                  fullWidth
                  value="Edwin Ricardo Cajan Morales"
                  size="small"
                  variant="outlined"
                  id="standard-error"
                  label="Cliente"
                  readonly
                />
                <TextField
                  disabled
                  fullWidth
                  value="983734000"
                  size="small"
                  variant="outlined"
                  id="standard-error"
                  label="Telefono"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  disabled
                  className="mb-5"
                  fullWidth
                  value="983734000"
                  size="small"
                  variant="outlined"
                  id="standard-error"
                  label="Cliente"
                  readonly
                />
                <TextField
                  disabled
                  fullWidth
                  value="calle las ciruelas 153 2do piso alborada"
                  size="small"
                  variant="outlined"
                  id="standard-error"
                  label="Telefono"
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
        <SimpleCard title={'Productos'}>
          <Table className="whitespace-pre">
            <TableHead>
              <TableRow>
                <TableCell className="px-0">Producto</TableCell>
                <TableCell className="px-0">Cantidad</TableCell>
                <TableCell className="px-0">Observacion</TableCell>
                <TableCell className="px-0">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0 capitalize" align="left">
                    {subscriber.product}
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">
                    {subscriber.quantity}
                  </TableCell>
                  <TableCell className="px-0">
                    <Tooltip title="Completar campos vacios">
                      <IconButton color="secondary">
                        <Icon className="">cancel</Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="px-0">
                    <Tooltip title="Asignar numero de serie">
                      <IconButton onClick={handlerSerialNumberOpen}>
                        <Icon color="primary">assignment</Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container spacing={3} className="pt-sm-24" justify="flex-end">
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button fullWidth color="secondary" variant="outlined">
                <span className="capitalize">Volver</span>
              </Button>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button fullWidth color="primary" variant="contained">
                <span className="capitalize">Guardar</span>
              </Button>
            </Grid>
          </Grid>
        </SimpleCard>
      </div>
      <SerialNumber
        product={productList}
        open={serialNumber}
        handleClose={handlerSerialNumberClose}
      />
    </>
  )
}

export default AddSerialNumb
