import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'

const ListProduct = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Agregar producto' }]} />
      </div>
      <SimpleCard title="Simple Table">Listar productos</SimpleCard>
    </div>
  )
}

export default ListProduct
