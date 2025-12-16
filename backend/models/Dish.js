import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	compound: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
		default: 0,
	},
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
