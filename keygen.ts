//importo le librerie
import { Keypair} from "@solana/web3.js";

// Andiamo a generare una nuova Keypair
const keypair = Keypair.generate();

//Stampo ID pubblico del wallet e private key da salvare
console.log(`Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()}. 
Per salvare il tuo wallet crea un JSON con questo contenuto: [${keypair.secretKey}]`);