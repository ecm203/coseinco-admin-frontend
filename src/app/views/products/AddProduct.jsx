import React, {useState} from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Button, Grid, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import draggableUploader from '../imageUploader/draggableUploader';

const AddProduct = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleSubmitForm = (data) => {}

  const [post, setPost] = useState({
    title: '',
    desc: '',
    photos: []
  });

  const [highlight, setHighlight] = useState(false);
  const { title, desc, photos } = post;

  const handleFileChange = e =>{
    let files = e.target.files;
    console.log(files);
    handleFiles(files);
  }

  const handleFiles = files =>{
     let photosArr = [];
    for(let file of files){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        let fileObj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result
        }
        photosArr.push(fileObj);
        setPost({
          ...post,
          photos: [...photos,...photosArr]
        })
      })
    }
  }

  const handleDelete = e =>{
    let target = e.target.parentElement;
    let targetindex = target.dataset.imgindex * 1;
    console.log(target,targetindex);
    setPost({
      ...post,
      photos: [...photos.slice(0,targetindex), ...photos.slice(targetindex + 1)]
    })
  }

  const handlehighlight = e =>{
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  }
  
  const handleunhighlight = e =>{
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  }

  const handledrop = e =>{
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    setHighlight(false);
    handleFiles(files);
    console.log(files);
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Agregar producto' }]} />
      </div>
      <SimpleCard title="Agregar producto">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.sku}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="SKU"
                    helperText={errors.sku?.message}
                  />
                )}
                name="sku"
                control={control}
                rules={{
                  required: 'Campo requerido',
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.name}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Nombre"
                    helperText={errors.name?.message}
                  />
                )}
                name="name"
                control={control}
                rules={{
                  required: 'Campo requerido',
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                name="quantity"
                control={control}
                defaultValue={1}
                rules={{
                  required: 'Campo requerido',
                  min: {
                    value: 1,
                    message: 'Cantidad min. 1',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.quantity}
                    fullWidth
                    type="number"
                    size="small"
                    variant="outlined"
                    label="Cantidad"
                    helperText={errors.quantity?.message}
                  />
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                name="cost"
                control={control}
                rules={{
                  required: 'Campo requerido',
                  min: {
                    value: 1,
                    message: 'Costo min. 1',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.cost}
                    fullWidth
                    type="number"
                    size="small"
                    variant="outlined"
                    label="Costo"
                    helperText={errors.cost?.message}
                  />
                )}
              />
            </Grid>
            <div class="file-upload">
                <h2>Arrastrar y soltar imagen...</h2>
                <form class="">
                    <div class="custom-form-group">
                        <div className={highlight ? "custom-file-drop-area highlight": "custom-file-drop-area"} onDragEnter={handlehighlight} onDragOver={handlehighlight} onDragLeave={handleunhighlight} onDrop={handledrop}>
                            <input type="file"name="photos" placeholder="Enter photos" multiple="true" id="filephotos" onChange={handleFileChange}/>
                            <label for="filephotos">Drag & Drop</label>
                        </div>
                        <div class="custom-file-preview">
                          {
                            photos.length > 0 && photos.map(
                              (item, index) =>(
                                <div class="prev-img" key={index} data-imgindex={index}>
                                  <span onClick={handleDelete}>&times;</span>
                                  <img src={item.src} alt={item.name}/>
                                </div>
                              )
                            )
                          }
                        </div>
                    </div>
                </form>
            </div>
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
  )
}

export default AddProduct
