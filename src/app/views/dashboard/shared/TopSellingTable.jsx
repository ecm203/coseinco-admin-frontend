import React from 'react'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  productTable: {
    '& small': {
      height: 15,
      width: 50,
      borderRadius: 500,
      boxShadow:
        '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
      borderBottom: 'none',
    },
    '& td:first-child': {
      paddingLeft: '16px !important',
    },
  },
}))

const TopSellingTable = ({data}) => {
  const classes = useStyles()

  return (
    <Card elevation={3} className="pt-5 mb-6">
      <div className="flex justify-between items-center px-6 mb-3">
        <span className="card-title">Productos</span>
      </div>
      <div className="overflow-auto">
        <Table
          className={clsx('whitespace-pre min-w-400', classes.productTable)}
        >
          <TableHead>
            <TableRow>
              <TableCell className="px-6" colSpan={5}>
                Nombre
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Ventas
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Stock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell className="px-0 capitalize" colSpan={5} align="left">
                  <div className="flex items-center">
                    <Avatar src={product.imagen} />
                    <p className="m-0 ml-8">{product.nombre}</p>
                  </div>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                  $
                  {product.venta > 999
                    ? (product.venta / 1000).toFixed(1) + 'k'
                    : product.venta}
                </TableCell>

                <TableCell className="px-0" align="left" colSpan={2}>
                  {product.stock ? (
                    product.stock < 20 ? (
                      <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                        {product.stock} available
                      </small>
                    ) : (
                      <small className="border-radius-4 bg-primary text-white px-2 py-2px">
                        in stock
                      </small>
                    )
                  ) : (
                    <small className="border-radius-4 bg-error text-white px-2 py-2px">
                      out of stock
                    </small>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

export default TopSellingTable
