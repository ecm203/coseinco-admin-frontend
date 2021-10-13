import React from 'react';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	Tooltip,
	IconButton,
	Icon,
	Grid
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import SerialNumber from './SerialNumber';

const productList = [
	{
		product: 'Monitor MSI 32" 144hz',
		sku: '6787AD8',
		quantity: 645
	},
	{
		product: 'Memoria Ram Kingston 8gb 3200Mhz',
		sku: '6787AD8',
		quantity: 645,
		serie: 'FDA4654WEFW'
	}
];

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const AddSerialNumb = ({ open, handleClose }) => {
	const [ serialNumber, setSerialNumberOpen ] = React.useState(false);

	const handlerSerialNumberOpen = () => {
		setSerialNumberOpen(true);
	};

    const handlerSerialNumberClose = () => {
		setSerialNumberOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title" dividers>
					{'Pedido Nro. 684'}
				</DialogTitle>
				<DialogContent dividers>
					<ValidatorForm onError={() => null}>
						<Grid container spacing={2}>
							<Grid item lg={6} md={6} sm={12} xs={12}>
								<TextValidator
									className="mb-4 w-full"
									label="Nombre"
									type="text"
									name="username"
									value={'Edwin'}
									disabled
								/>
								<TextValidator
									className="mb-4 w-full"
									label="Correo"
									type="text"
									name="email"
									value={'edwincajan@urp.edu.pe'}
									disabled
								/>
							</Grid>

							<Grid item lg={6} md={6} sm={12} xs={12}>
								<TextValidator
									className="mb-4 w-full"
									label="Telefono"
									type="text"
									name="phone"
									value={'987654321'}
									disabled
								/>
								<TextValidator
									className="mb-4 w-full"
									label="Direccion"
									type="text"
									name="adress"
									value={'Av. Alfredo Benavides 5440, Santiago de Surco 15039'}
									disabled
								/>
							</Grid>
						</Grid>
					</ValidatorForm>
					<Table className="whitespace-pre">
						<TableHead>
							<TableRow>
								<TableCell className="px-0">Producto</TableCell>
								<TableCell className="px-0">Cantidad</TableCell>
								<TableCell className="px-0">Observacion</TableCell>
								<TableCell className="px-0">Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{productList.map((subscriber, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										{subscriber.product}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{subscriber.quantity}
									</TableCell>
									<TableCell className="px-0">
										<Tooltip title="Completar campos vacios">
											<IconButton>
												<Icon className="bg-error">cancel</Icon>
											</IconButton>
										</Tooltip>
									</TableCell>
									<TableCell className="px-0">
										<Tooltip title="Asignar numero de serie">
											<IconButton onClick={handlerSerialNumberOpen}>
												<Icon color="primary">assignment</Icon>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</DialogContent>
				<DialogActions>
					<Button color="primary" variant="contained" type="submit">
						<Icon>save</Icon>
						<span className="pl-2 capitalize">Guardar</span>
					</Button>
				</DialogActions>
			</Dialog>
            <SerialNumber product={productList} open={serialNumber} handleClose={handlerSerialNumberClose}/>
		</div>
	);
};

export default AddSerialNumb;
