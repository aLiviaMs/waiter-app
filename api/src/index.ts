import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import { router } from './router';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Library WaiterApp API',
			version: '1.0.0'
		}
	},
	apis: ['router.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);

mongoose.connect('mongodb://localhost:27017')
	.then(() => {
		const app = express();
		const port = 3001;

		app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
		app.use(express.json());
		app.use(router);

		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	})
	.catch(() => console.log('Error on connecting'));
