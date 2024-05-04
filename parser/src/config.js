import dotenv from 'dotenv';
dotenv.config({ path: new URL('../.env', import.meta.url) });

// ---------------------------------------------------------------------- //

const config = {};

config.botUserIds = {
	Maxim: 1387680086,
	//Nikita: 776127321,
};

config.botApiKey = process.env.BOT_API_KEY;


config.database = {
	pool: {
		min: Number(process.env.DATABASE_POOL_MIN),
		max: Number(process.env.DATABASE_POOL_MAX),
	},
	url: process.env.DATABASE_URL,
	schema: process.env.DATABASE_SCHEMA || 'public',
};	

// ---------------------------------------------------------------------- //

export default config;