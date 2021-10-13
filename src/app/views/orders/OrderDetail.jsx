import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Icon, Grid, Table, TableHead, TableBody, TableRow, TableCell, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Breadcrumb, SimpleCard } from 'app/components';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const ordersList = [
	{
		idProduct: '1231231',
		names: 'Memoria Ram Kingston 8gb 3200Mhz',
		price: 280,
		quantity: 2
	},
	{
		idProduct: '1231231',
		names: 'Monitor MSI 32" 144hz',
		price: 1200,
		quantity: 1
	}
];

const OrderDetail = ({ open, handleClose }) => {
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
	const [ orderDialogOpen, setOrderDialogOpen ] = React.useState(false);
	const [ referralGuideOpen, setReferralGuideOpen ] = React.useState(false);
	const [ state, setState ] = useState({
		date: new Date()
	});
	const handleOrderDetailOpen = () => {
		setOrderDialogOpen(true);
	};
	const handleReferralGuideOpen = () => {
		setReferralGuideOpen(true);
	};
	useEffect(
		() => {
			ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
				console.log(value);

				if (value !== state.password) {
					return false;
				}
				return true;
			});
			return () => ValidatorForm.removeValidationRule('isPasswordMatch');
		},
		[ state.password ]
	);

	const handleSubmit = (event) => {};

	const handleChange = (event) => {
		event.persist();
		setState({
			...state,
			[event.target.name]: event.target.value
		});
	};

	const handleDateChange = (date) => {
		setState({ ...state, date });
	};

	const { username } = state;

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">{'Pedido Nro. 564'}</DialogTitle>
			<DialogContent dividers>
				<ValidatorForm onSubmit={handleSubmit} onError={() => null}>
					<Grid container spacing={2}>
						<Grid item lg={6} md={6} sm={12} xs={12}>
							<TextValidator
								className="mb-4 w-full"
								label="Nombre"
								type="text"
								name="username"
								value={username || 'Edwin'}
								disabled
							/>
							<TextValidator
								className="mb-4 w-full"
								label="Correo"
								type="text"
								name="email"
								value={username || 'edwincajan@urp.edu.pe'}
								disabled
							/>
						</Grid>

						<Grid item lg={6} md={6} sm={12} xs={12}>
							<TextValidator
								className="mb-4 w-full"
								label="Telefono"
								type="text"
								name="phone"
								value={username || '987654321'}
								disabled
							/>
							<TextValidator
								className="mb-4 w-full"
								label="Direccion"
								type="text"
								name="adress"
								value={username || 'Av. Alfredo Benavides 5440, Santiago de Surco 15039'}
								disabled
							/>
						</Grid>
					</Grid>
				</ValidatorForm>
				<div className="m-sm-15">
					<div className="mb-sm-10">Productos</div>
					<SimpleCard>
						<Table className="whitespace-pre">
							<TableHead>
								<TableRow>
									<TableCell className="px-0">ID Pedido</TableCell>
									<TableCell className="px-0">Producto</TableCell>
									<TableCell className="px-0">Costo unitario (s/.)</TableCell>
									<TableCell className="px-0">Cantidad</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ordersList.map((subscriber, index) => (
									<TableRow key={index}>
										<TableCell className="px-0 capitalize" align="left">
											{subscriber.idProduct}
										</TableCell>
										<TableCell className="px-0 capitalize" align="left">
											{subscriber.names}
										</TableCell>
										<TableCell className="px-0 capitalize" align="left">
											{subscriber.price}
										</TableCell>
										<TableCell className="px-0 capitalize" align="left">
											{subscriber.quantity}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</SimpleCard>
				</div>
				<DialogActions>
					<Button color="primary" variant="contained" type="submit">
						<Icon>close</Icon>
						<span className="pl-2 capitalize">Cerrar</span>
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default OrderDetail;
