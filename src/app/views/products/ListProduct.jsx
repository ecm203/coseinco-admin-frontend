import React from 'react'
import { Breadcrumb } from 'app/components';
const ListProduct = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: 'Listar productos' },
          ]}
        />
      </div>
    </div>
  )
}

export default ListProduct
