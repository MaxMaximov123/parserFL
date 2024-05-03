import config from './config.js';
import Scanner from './scanner.js';

async function main() {
	new Scanner();
	// new Scanner({ restartTime: 60 });
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
