import React from 'react';
import {
  Breadcrumb,
  SimpleCard,
} from 'app/components';
import {
  Avatar,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Icon,
  Grid,
} from '@mui/material';


const productos = [
  {
    SKU: '01112',
    nombre: 'Prueba 1',
    precio: "99",
    estado: 'habilitado',
    imagen:'https://res.cloudinary.com/dzsitpxzw/image/upload/v1634182049/sample.jpg'
  },
  {
    SKU: '01113',
    nombre: 'Prueba 2',
    precio: "199",
    estado: 'habilitado',
    imagen:'https://res.cloudinary.com/dzsitpxzw/image/upload/v1634182049/sample.jpg'
  }
]

const ListProduct = () => {
  const handleBackTo = () => {
    //home 
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: 'Listar productos' },
          ]}
        />
      </div>
      <SimpleCard title={'Productos'}>
            <div className="overflow-auto">
              <Table className={'whitespace-pre min-w-600'}>
                <TableHead>
                  <TableRow>
                    <TableCell className="px-0" colSpan={1}>
                      SKU
                    </TableCell>
                    <TableCell className="px-0" colSpan={4}>
                      Producto
                    </TableCell>
                    <TableCell className="pr-0" align="right" colSpan={1}>
                      Precio de venta (s/.)
                    </TableCell>
                    <TableCell className="pr-5" align="right" colSpan={1}>
                      Estado
                    </TableCell>
                     <TableCell className="pr-5" align="right" colSpan={1}>
                      Acciones
                    </TableCell>
                    <TableCell className="pr-5" align="right" colSpan={1}>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((subscriber, index) => (
                    <TableRow key={index}>
                      <TableCell
                        colSpan={1}
                        className="px-0 capitalize"
                        align="left"
                        >
                        {subscriber.SKU}
                      </TableCell>
                      <TableCell colSpan={4} className="px-0 capitalize" align="left">
                        <div className="flex items-center">
                          {<Avatar src={subscriber.imagen} />}
                          <p className="m-0 ml-4">{subscriber.nombre}</p>
                        </div>
                      </TableCell>
                      <TableCell
                          colSpan={1}
                          className="pr-5"
                          align="right"
                      >
                        {subscriber.precio}
                      </TableCell>
                      <TableCell
                          colSpan={1}
                          className="px-1"
                          align="right"
                      >
                        {subscriber.estado}
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        className="px-5"
                      >
                        <Tooltip title="Visualizar">
                            <IconButton
                              size="large"
                            >
                              <Icon color="primary">visibility</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            size="large"
                          >
                            <Icon color="primary">edit</Icon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Anuladar">
                          <IconButton
                            size="large"
                          >
                            <Icon color="primary">do_not_disturb_alt</Icon>
                          </IconButton>
                        </Tooltip>
                          
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Grid
              container
              spacing={3}
              className="pt-sm-24"
              justifyContent="flex-end"
              >
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={handleBackTo}
                  >
                  <span className="capitalize">Volver atras</span>
                </Button>
              </Grid>
            </Grid>
      </SimpleCard>
    </div>
  )
}

export default ListProduct
