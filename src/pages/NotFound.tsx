import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/');
	};

	return (
		<Container style={{ textAlign: 'center', marginTop: '50px' }}>
			<Typography variant="h1" component="h2" gutterBottom>
				404
			</Typography>
			<Typography variant="h5" component="h3" gutterBottom>
				Page Not Found
			</Typography>
			<Typography variant="body1" gutterBottom>
				The page you are looking for does not exist.
			</Typography>
			<Button variant="contained" color="primary" onClick={handleGoHome}>
				Go to Home
			</Button>
		</Container>
	);
};

export default NotFound;