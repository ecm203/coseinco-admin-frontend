import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components';
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

      <SimpleCard title="Simple Table">
        Hola mundo 2
      </SimpleCard> 
    </div>
  )
}

export default ListProduct
