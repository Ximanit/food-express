import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
	User: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	cart: [
		{
			name: {
				type: String,
			},
			count: {
				type: Number,
			},
			price: {
				type: Number,
			},
		},
	],
	sum: {
		type: Number,
	},
	deliveryAddress: {
		type: String,
		required: true,
	},
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
