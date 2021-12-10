import React, { useState } from 'react'
import {
  Dialog,
  Slide,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const FinalizeOrderModal = ({ open, orderCode, handleClose, handleSubmit }) => {
  const [post, setPost] = useState({
    photos: [],
  })
  const [highlight, setHighlight] = useState(false)
  const { photos } = post

  const handleFileChange = (e) => {
    let files = e.target.files
    console.log(files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    let photosArr = []
    for (let file of files) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        let fileObj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        }
        photosArr.push(fileObj)
        setPost({
          ...post,
          photos: [...photos, ...photosArr],
        })
      })
    }
  }

  const handleDelete = (e) => {
    let target = e.target.parentElement
    let targetindex = target.dataset.imgindex * 1
    console.log(target, targetindex)
    setPost({
      ...post,
      photos: [
        ...photos.slice(0, targetindex),
        ...photos.slice(targetindex + 1),
      ],
    })
  }

  const handlehighlight = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(true)
  }

  const handleunhighlight = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
  }

  const handledrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let dt = e.dataTransfer
    let files = dt.files
    setHighlight(false)
    handleFiles(files)
    console.log(files)
  }

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{orderCode}</DialogTitle>
      <DialogContent>
        <div className="custom-form-group">
          <div
            className={
              highlight
                ? 'custom-file-drop-area highlight'
                : 'custom-file-drop-area'
            }
            onDragEnter={handlehighlight}
            onDragOver={handlehighlight}
            onDragLeave={handleunhighlight}
            onDrop={handledrop}
          >
            <input
              type="file"
              name="photos"
              placeholder="Enter photos"
              multiple={true}
              onChange={handleFileChange}
              id="filephotos"
            />
            <label htmlFor="filephotos">Inserte costancia de envio</label>
          </div>
          <div className={photos.length > 0 ? 'files' : ''}>
            <ul>
              {photos.length > 0 &&
                photos.map((item, index) => <li key={index}>{item.name}</li>)}
            </ul>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="text"
          type="button"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button color="primary" variant="text" onClick={() => handleSubmit(photos)}>
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FinalizeOrderModal
