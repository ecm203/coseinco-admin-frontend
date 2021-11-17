import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard, MaxtBackdrop } from 'app/components'
import { Grid, TextField, Autocomplete, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

const listaRoles = [
  {
    rol: 'Conductor',
  },
  {
    rol: 'Tecnico',
  },
  {
    rol: 'Jefe de Compra',
  },
  {
    rol: 'Administrador',
  },
]
const lDocumento = [
  {
    documento: 'DNI',
  },
  {
    documento: 'Carnet de Extranjeria',
  },
]

const AddUsser = () => {
  const [rol, setRol] = useState('')
  const [document, setDocument] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setRol(JSON.stringify(listaRoles.rol))
    setIsLoading(true)
  }, [])

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValue: {
      nombre: '',
      rol: '',
      documento: '',
      nroDocumento: '',
      brevete: '',
      placa: '',
    },
  })

  const handleChangeRol = (data) => {
    if (data) {
      setRol(data.rol)
    } else {
      setRol('')
    }
  }
  const handleChangeDocumento = (data) => {
    if (data) {
      setDocument(data.rol)
    } else {
      setDocument('')
    }
  }

  return (
    <>
      <MaxtBackdrop />
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: 'Agregar Usuario' }]} />
        </div>
        <div className="mb-sm-30">
          <SimpleCard title={'Agregar Usuario'}>
            <form onSubmit={handleSubmit()}>
              <Grid container spacing={4}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: 'Nombre requerido',
                      pattern: {
                        value: /\D+/,
                        message: 'Nombre no debe tener numeros',
                      },
                    }}
                    defaultValue={null}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.nombre}
                        fullWidth
                        type="text"
                        size="small"
                        variant="outlined"
                        label="Nombre y Apellido"
                        helperText={errors.nombre?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="controlled-demo"
                        options={lDocumento}
                        fullWidth
                        getOptionLabel={(option) => option.documento}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Tipo de Documento"
                            variant="outlined"
                            size="small"
                            error={!!errors.documento}
                            helperText={errors.documento?.message}
                          />
                        )}
                        onChange={(_, data) => {
                          handleChangeDocumento(data)
                          return field.onChange(data)
                        }}
                      />
                    )}
                    defaultValue={null}
                    name="documento"
                    control={control}
                    rules={{
                      required: 'Seleccione tipo de documento',
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    name="nroDocumento"
                    control={control}
                    rules={{
                      required: 'Nro. de documento requerido',
                      pattern: {
                        value: /^\d{8}$/,
                        message: 'Nro. de documento incorrecto',
                      },
                    }}
                    defaultValue={null}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.nroDocumento}
                        helperText={errors.nroDocumento?.message}
                        fullWidth
                        type="number"
                        size="small"
                        variant="outlined"
                        label="Nro. Documento"
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="controlled-demo"
                        options={listaRoles}
                        fullWidth
                        getOptionLabel={(option) => option.rol}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Rol"
                            variant="outlined"
                            size="small"
                            error={!!errors.rol}
                            helperText={errors.rol?.message}
                          />
                        )}
                        onChange={(_, data) => {
                          handleChangeRol(data)
                          return field.onChange(data)
                        }}
                      />
                    )}
                    defaultValue={null}
                    name="rol"
                    control={control}
                    rules={{
                      required: 'Seleccione un rol',
                    }}
                  />
                </Grid>
                {rol === 'Conductor' ? (
                  <>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Controller
                        name="brevete"
                        control={control}
                        rules={{
                          required: 'Brevete requerido',
                        }}
                        defaultValue={null}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.brevete}
                            helperText={errors.brevete?.message}
                            fullWidth
                            type="text"
                            size="small"
                            variant="outlined"
                            label="Brevete"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Controller
                        name="placa"
                        control={control}
                        rules={{
                          required: 'Placa requerido',
                          pattern: {
                            value: /\w{3}-\d{3}/,
                            message: 'Placa  incorrecto',
                          },
                        }}
                        defaultValue={null}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={!!errors.placa}
                            helperText={errors.placa?.message}
                            fullWidth
                            type="text"
                            size="small"
                            variant="outlined"
                            label="Placa de Vehiculo"
                          />
                        )}
                      />
                    </Grid>
                  </>
                ) : (
                  <div></div>
                )}
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Button
                    className="w-full"
                    sx={{ height: '37px' }}
                    color="primary"
                    variant="outlined"
                    type="submit"
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </SimpleCard>
        </div>
      </div>
    </>
  )
}

export default AddUsser
