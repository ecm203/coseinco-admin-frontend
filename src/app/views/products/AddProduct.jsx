import React from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
const AddProduct = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: 'Agregar producto' },
          ]}
        />
      </div>
      <SimpleCard title="Simple Table">
        Hola mundo
        asdasdasd
      </SimpleCard>
    </div>
  )
}

export default AddProduct
