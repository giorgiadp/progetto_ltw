function ricetta(titolo, tempo, difficolta, ingredienti, procedimento, foto, stelle){
    this.titolo=titolo;
    this.tempo=tempo;
    this.difficolta=difficolta;
    this.ingredienti=ingredienti;
    this.procedimento=procedimento;
    this.foto=foto;
    this.stelle=stelle;
}

//usato in aggiungiRicetta.html
function aggiungi(){
    titolo=document.getElementById("titolo").value;
    tempo=document.getElementById("tempo").value;
    difficolta=document.getElementById("difficolta").value;
    ingredienti=document.getElementById("ingredienti").value;
    procedimento=document.getElementById("procedimentoRicetta").value;
    foto=document.getElementById("foto").value;
    stelle="0";

    if(titolo=="" || tempo=="" || difficolta=="" || ingredienti == "" || procedimento=="" || foto==""){
        alert("Tutti i campi sono obbligatori.");
        return false;
    }

    if(isNaN(tempo)){ 
        alert("Il tempo deve essere un valore numerico.");
        return false;
    }
    if(isNaN(difficolta)){ 
        alert("La difficoltà deve essere un valore numerico.");
        return false;
    }
    if(difficolta<1 || difficolta>5){ 
        alert("La difficoltà deve essere un valore numerico tra 1 e 5.");
        return false;
    }

    if(typeof(Storage) != "undefined"){
        var r= new ricetta(titolo, tempo, difficolta, ingredienti, procedimento, foto, stelle);
       
        if(localStorage.length == 1){ // se la lunghezza è 1 vuol dire che non ci sono ricette perche se la sto inserendo mi sono loggato quindi il local storage ha utente 
            var a=[]
            a.push(r);
            localStorage.setItem('Ricette', JSON.stringify(a));
            

        }
        else{
            var a=JSON.parse(localStorage.getItem('Ricette'));
            a.push(r);
            localStorage.setItem('Ricette', JSON.stringify(a));
            
        }
        alert("La ricetta è stata aggiunta correttamente.");
        window.location.href="./grafica.html";
    }

}

//usata in ricette.html
function verificaLogin(){
    if(JSON.parse(sessionStorage.getItem('Loggato'))=='si'){
        return true;
    }
    else{
        return false;
    }
}

//usata in ricette.html
function valutaRicetta(){
    if(verificaLogin()){
        $("#valuta").css("display", "block");
    }
    else{
        alert("Attenzione! Per poter valutare la ricetta devi aver effettuato l'accesso.");
    }
}

let numeroStella=0;
let click=0;

//usata in ricette.html
function colora(n){
    if(click==0){
        for(; n>0 ; n--){
            var imm=document.getElementById(n)
            imm.src="star-on.png";
        }
    }
    return n;
}

//usata in ricette.html
function decolora(n){
    if (click==0){
        for(; n>0; n--){
            var imm=document.getElementById(n)
            imm.src="star-off.png";
        }
    }
    return n;
}

//usata in ricette.html
function salvaNumStella(n){
    numeroStella=n;
    if(click==0)
        click=1;
    else
        click=0;
}

//usata in ricette.html
function mandaValutazione(){
    if(numeroStella==0){
        alert("Inserisci una valutazione!");
    }
    else{
        var index=JSON.parse(sessionStorage.getItem('indiceRicetta'));
        var listaRicette=JSON.parse(localStorage.getItem('Ricette'));
        var ricettaScelta= listaRicette[index];
        listaRicette.pop(ricettaScelta);
        var media= ricettaScelta.stelle;
        var nuovaMedia;
        if(media != 0){
            nuovaMedia= (numeroStella+media)/2;        
        }
        else{
            nuovaMedia=numeroStella;
        }
        ricettaScelta.stelle=nuovaMedia;
        listaRicette[index]=ricettaScelta;
        localStorage["Ricette"]=JSON.stringify(listaRicette);
    }
    
}
