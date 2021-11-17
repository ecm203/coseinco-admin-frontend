import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  SimpleCard,
  MaxtBackdrop,
  MatxSnackbar,
  ConfirmationDialog,
} from 'app/components'
import {
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Icon,
} from '@mui/material'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import VisualizeSupplier from './VisualizeSupplier'
import ModifySupplier from './ModifySupplier'
const apiUrl = 'http://localhost:5000/api-admin'

const ListSupplier = () => {
  const history = useHistory()
  const [supplierlist, setSupplierList] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [isOpenModalD, setIsOpenModalD] = useState(false)
  const [isOpenModalH, setIsOpenModalH] = useState(false)
  const [supplierIdSelected, setSupplierIdSelected] = useState(null)
  const [supplierSelectedV, setSupplierSelectedV] = useState('')
  const [visualize, setVisualize] = useState(false)
  const [modify, setModify] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    history.push('/')
    setIsError(false)
  }

  useEffect(() => {
    loadTableData()
    return () => {
      loadTableData()
    }
  }, [])

  const handleOpenModalDeshabilitar = (supplierIdSelected) => {
    setIsOpenModalD(true)
    setSupplierIdSelected(supplierIdSelected)
  }

  const handleOpenModalHabilitar = (supplierIdSelected) => {
    setIsOpenModalH(true)
    setSupplierIdSelected(supplierIdSelected)
  }

  const handleCloseModal = () => {
    setIsOpenModalD(false)
  }

  const handleCloseModalH = () => {
    setIsOpenModalH(false)
  }

  const loadTableData = () => {
    setSupplierList(null)
    setIsLoading(true)
    axios.get(`${apiUrl}/proveedor`).then(
      (response) => {
        setSupplierList(response.data.proveedores)
        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)
        setIsError(true)
      }
    )
  }

  const handleDeshabilitarSupplier = () => {
    setIsLoading(true)
    axios
      .post(`${apiUrl}/proveedor/deshabilitar`, {
        id: supplierIdSelected,
      })
      .then(
        (response) => {
          setIsOpenModalD(false)
          loadTableData()
        },
        (error) => {
          setIsOpenModalD(false)
        }
      )
  }

  const handleHabilitarSupplier = () => {
    setIsLoading(true)
    axios
      .post(`${apiUrl}/proveedor/habilitar`, {
        id: supplierIdSelected,
      })
      .then(
        (response) => {
          setIsOpenModalH(false)
          loadTableData()
        },
        (error) => {
          setIsOpenModalH(false)
        }
      )
  }

  const handleVisualize = async (id) => {
    await axios.get(`${apiUrl}/proveedor/getProveedor/` + id).then(
      (response) => {
        setSupplierSelectedV(response.data.proveedor)
        console.log(response.data.proveedor)
      },
      (error) => {
        setIsError(true)
      }
    )
    setVisualize(true)
  }

  const handleModify = async (id) => {
    await axios.get(`${apiUrl}/proveedor/getProveedor/` + id).then(
      (response) => {
        setSupplierSelectedV(response.data.proveedor)
        console.log(response.data.proveedor)
      },
      (error) => {
        setIsError(true)
      }
    )
    setModify(true)
  }

  const toggleModal = () => {
    setVisualize(!visualize)
  }

  const toggleModalM = () => {
    setModify(!modify)
  }

  return (
    <>
      <MaxtBackdrop isOpen={isLoading} />
      {!isLoading && !isError && (
        <>
          <div className="m-sm-30">
            <div className="mb-sm-30">
              <Breadcrumb routeSegments={[{ name: 'Listar proveedores' }]} />
            </div>
            <SimpleCard title={`${supplierlist != null && supplierlist.length} proveedores`}>
              <Table className={'whitespace-pre min-w-600'}>
                <TableHead>
                  <TableRow>
                    <TableCell className="pl-5" colSpan={1}>
                      #
                    </TableCell>
                    <TableCell className="px-0" colSpan={3}>
                      Razon social
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      RUC
                    </TableCell>
                    <TableCell className="px-0" colSpan={3}>
                      Contacto
                    </TableCell>
                    <TableCell className="px-0" colSpan={2} align="left">
                      Estado
                    </TableCell>
                    <TableCell className="pl-10" colSpan={3} align="left">
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplierlist != null && supplierlist
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((supplier, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={1} className="pl-5" align="left">
                          {(index += 1)}
                        </TableCell>
                        <TableCell
                          colSpan={3}
                          className="px-0 capitalize"
                          align="left"
                        >
                          {supplier.razonSocial}
                        </TableCell>
                        <TableCell colSpan={2} className="px-0" align="left">
                          {supplier.ruc}
                        </TableCell>
                        <TableCell colSpan={3} className="px-0" align="left">
                          {supplier.contacto}
                        </TableCell>
                        <TableCell colSpan={2} className="px-0" align="left">
                          {supplier.estado === 'habilitado' ? (
                            <small className="border-radius-4 bg-primary text-white px-2 py-2px">
                              {supplier.estado}
                            </small>
                          ) : (
                            <small className="border-radius-4 bg-error text-white px-2 py-2px">
                              {supplier.estado}
                            </small>
                          )}
                        </TableCell>
                        <TableCell colSpan={3} className="px-0" align="left">
                          <Tooltip title="Visualizar">
                            <IconButton
                              size="large"
                              onClick={() => handleVisualize(supplier._id)}
                            >
                              <Icon color="primary">visibility</Icon>
                            </IconButton>
                          </Tooltip>

                          {supplier.estado === 'deshabilitado' ? (
                            <Tooltip title="Habilitar">
                              <IconButton
                                size="large"
                                onClick={() =>
                                  handleOpenModalHabilitar(supplier._id)
                                }
                              >
                                <Icon color="primary">check</Icon>
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <>
                              <Tooltip title="Editar">
                                <IconButton
                                  size="large"
                                  onClick={() => handleModify(supplier._id)}
                                >
                                  <Icon color="primary">edit</Icon>
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Deshabilitar">
                                <IconButton
                                  size="large"
                                  onClick={() =>
                                    handleOpenModalDeshabilitar(supplier._id)
                                  }
                                >
                                  <Icon color="primary">
                                    do_not_disturb_alt
                                  </Icon>
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={supplierlist != null && supplierlist.length}
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
              {/* </div> */}
            </SimpleCard>
          </div>

          <ConfirmationDialog
            open={isOpenModalD}
            onConfirmDialogClose={handleCloseModal}
            onYesClick={handleDeshabilitarSupplier}
            title={'Deshabilitar proveedor'}
            text={'¿ Seguro que desea deshabilitar a este proveedor?'}
          />

          <ConfirmationDialog
            open={isOpenModalH}
            onConfirmDialogClose={handleCloseModalH}
            onYesClick={handleHabilitarSupplier}
            title={'Habilitar proveedor'}
            text={'¿ Seguro que desea habilitar a este proveedor?'}
          />

          {visualize ? (
            <VisualizeSupplier
              supplier={supplierSelectedV}
              isOpen={visualize}
              onToggle={toggleModal}
            />
          ) : null}

          {modify ? (
            <ModifySupplier 
            supplierM={supplierSelectedV}
            isOpen={modify}
            loadTable={loadTableData}
            onToggle={toggleModalM}/>
          ) :  null}
        </>
      )}

      {!isLoading && isError && (
        <MatxSnackbar
          open={isError}
          title={'Error'}
          message={<>Sucedió algo inesperado intentelo nuevamente</>}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default ListSupplier
