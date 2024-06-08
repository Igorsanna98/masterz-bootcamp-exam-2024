import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

//Io sono BhjrrnNT7cCcK9PFUDPhPi3baNXXNdUJbbDLz8JMv2tf
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); 

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

//Indirizzo precedentemente creato appartenente al Mint Account creato con spl_init
const mint = new PublicKey("DdvL7wrszxoTH1YT9pyU9cDTB24ZLXboaCLgntmqrNoK");


(async () => {

    //Ottiene o crea un token account associato
    const tokenAccount = await getOrCreateAssociatedTokenAccount( 
        connection, //connessione
        keypair, //chiave privata
        mint, //indirizzo mint 
        keypair.publicKey, //indirizzo della chiave pubblica associata al portafoglio 
    );

    //Ottengo l'indirizzo dell'account token associato 
    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    //Definisco la quantità di token da emettere, in questo caso 10 milioni
    const amount = 10e6;

    //Con minTo emetto un certo numero di token 
    await mintTo(
        connection, //connessione
        keypair, //chiave privata
        mint, //indirizzo del mint account
        ata, //indirizzo dell'account token 
        keypair.publicKey, //indirizzo della chiave pubblica associata al portafoglio
        amount //quantità di token da emettere
    );

    //Stampa sulla console un messaggio che conferma l'avvenuta emissione dei token.
    console.log("Minted", amount, "to", ata.toBase58());

})()