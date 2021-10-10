import React from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import {
	IconButton,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Icon,
	Tooltip,
	TablePagination
} from '@material-ui/core';
import OrderDetail from './OrderDetail';
import ReferralGuide from './ReferralGuide';

const ordersList = [
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'generado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'reservado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'empaquetado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'enviado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'finalizado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'geenerado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'reservado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'reservado'
	},
	{
		idOrder: '1231231',
		names: 'Edwin Ricardo Cajan Morales',
		total: 54.6,
		status: 'reservado'
	}
];

const BookOrder = () => {
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
	const [ orderDialogOpen, setOrderDialogOpen ] = React.useState(false);
	const [ referralGuideOpen, setReferralGuideOpen ] = React.useState(false);
	const [ page, setPage ] = React.useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleOrderDetailOpen = () => {
		setOrderDialogOpen(true);
	};

	const handleOrderDetailClose = () => {
		setOrderDialogOpen(false);
	};

	const handleReferralGuideOpen = () => {
		setReferralGuideOpen(true);
	};

	const handleReferralGuideClose = () => {
		setReferralGuideOpen(false);
	};

	return (
		<div className="m-sm-30">
			<div className="mb-sm-30">
				<Breadcrumb routeSegments={[ { name: 'Reservar pedido' } ]} />
			</div>
			<SimpleCard title={`${ordersList.length} pedidos registrados`}>
				<Table className="whitespace-pre">
					<TableHead>
						<TableRow>
							<TableCell className="px-0">ID Pedido</TableCell>
							<TableCell className="px-0">Nombres y apellidos</TableCell>
							<TableCell className="px-0">Total</TableCell>
							<TableCell className="px-0">Estado</TableCell>
							<TableCell className="px-0">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ordersList
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((subscriber, index) => (
								<TableRow key={index}>
									<TableCell className="px-0 capitalize" align="left">
										{subscriber.idOrder}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{subscriber.names}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{subscriber.total}
									</TableCell>
									<TableCell className="px-0 capitalize" align="left">
										{subscriber.status}
									</TableCell>
									<TableCell className="px-0">
										<Tooltip title="Visualizar pedido">
											<IconButton onClick={handleOrderDetailOpen}>
												<Icon color="primary">visibility</Icon>
											</IconButton>
										</Tooltip>
										{subscriber.status === 'reservado' && (
											<Tooltip title="Generar guia de remision">
												<IconButton onClick={handleReferralGuideOpen}>
													<Icon color="primary">assignment</Icon>
												</IconButton>
											</Tooltip>
										)}
										{(subscriber.status === 'empaquetado' ||
											subscriber.status === 'enviado' ||
											subscriber.status === 'finalizado') && (
											<Tooltip title="Descargar guia de remision">
												<IconButton>
													<Icon color="primary">download</Icon>
												</IconButton>
											</Tooltip>
										)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination
					className="px-4"
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={ordersList.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
				<OrderDetail open={orderDialogOpen} handleClose={handleOrderDetailClose} />
				<ReferralGuide open={referralGuideOpen} handleClose={handleReferralGuideClose} />
			</SimpleCard>
		</div>
	);
};

export default BookOrder;
