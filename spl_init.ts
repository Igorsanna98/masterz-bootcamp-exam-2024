import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import wallet from "./wallet.json";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {

    //creazione di un nuovo token (Mint) sulla blockchain Solana.
    const mint = await createMint(
        connection, //Connessione alla rete solana
        keypair, //la chiave privata per firmare la transazione
        keypair.publicKey, //chiave pubblica associata al portafoglio, usata per identificarlo sulla blockchain
        null, //opzionale
        6, //il numero di decimali del token
    );

    //stampa del risultato
    console.log("Mint Address:", mint.toBase58());
})()
