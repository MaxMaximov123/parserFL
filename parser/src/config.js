import dotenv from 'dotenv';
dotenv.config({ path: new URL('../.env', import.meta.url) });

// ---------------------------------------------------------------------- //

const config = {};

config.botUsers = {
	Maxim: {
		id: 1387680086,
		filter: (fullName) => {
			fullName = fullName.toLowerCase();
			if ([
				'tild', 'тильд', '1с', '1c', 
				'вордпрес', 'wordpr', 'диза', 'битр',
				'seo', 'лого', 'smm',
				'реклам'
			].some((word) => fullName.includes(word))) {
				return false;
			}

			if (['курс', 'рерайт', 'дипло', 'copywrit'
			].some((word) => fullName.includes(word))) {
				return true;
			}

			return true;
		}
	},
	Nikita: {
		id: 776127321,
		filter: (fullName) => {
			fullName = fullName.toLowerCase();
			if ([
				'tild', 'тильд', '1с', '1c', 
				'вордпрес', 'wordpr', 'диза', 'битр',
				'seo', 'сайт', 'парс', 'верст', 'лого', 'smm',
				'реклам', 'иконк'
			].some((word) => fullName.includes(word))) {
				return true;
			}

			if (['курс', 'рерайт', 'дипло', 'copywrit'
			].some((word) => fullName.includes(word))) {
				return false;
			}

			return false;
		}
	}
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