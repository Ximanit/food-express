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
		type: Double,
		required: true,
		minlegth: 6,
	},
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
