import React, { Fragment } from 'react';
import {
	Dialog,
	Slide,
	TextField,
	DialogActions,
	Icon,
	DialogTitle,
	DialogContent,
	IconButton,
    Hidden
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import { SimpleCard } from 'app/components';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

const seriesNumbers = [
	{ label: '123123123' },
	{ label: '121212121' },
	{ label: '131313131' },
	{ label: '321321321' }
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const SerialNumber = ({ open, handleClose, product }) => {
	var cantidadProductos = product.length;
	console.log(cantidadProductos);
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
                onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<SimpleCard title="Monito MSI 32'' 144hz ">
					<DialogContent dividers>
						<div>
							<strong>Numero de serie</strong>
							<hr />
							{`Hay ${cantidadProductos} productos1`}
						</div>
						<br />
						<Fragment>
							{
								
									<Autocomplete
										className="mb-4 w-300"
										options={seriesNumbers}
										getOptionLabel={(option) => option.label}
										renderInput={(params) => (
											<TextField {...params} label="Seleccionar numero de serie..." variant="outlined" fullWidth />
										)}
									/>
								
						
							}
						</Fragment>
						<DialogActions>
							<Button color="primary" variant="contained" type="submit">
								<Icon>save</Icon>
								<span className="pl-2 capitalize">Guardar</span>
							</Button>
						</DialogActions>
					</DialogContent>
				</SimpleCard>
			</Dialog>
		</div>
	);
};

export default SerialNumber;
