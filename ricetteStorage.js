function funzioneLogoutRicetta(){
    window.location.href="./grafica.html";
}


function ricetta(titolo, tempo, difficolta, ingredienti, procedimento, foto, stelle){
    this.titolo=titolo;
    this.tempo=tempo;
    this.difficolta=difficolta;
    this.ingredienti=ingredienti;
    this.procedimento=procedimento;
    this.foto=foto;
    this.stelle=stelle;
}

function aggiungi(){
    titolo=document.getElementById("titolo").value;
    tempo=document.getElementById("tempo").value;
    difficolta=document.getElementById("difficolta").value;
    ingredienti=document.getElementById("ingredienti").value;
    procedimento=document.getElementById("procedimentoRicetta").value;
    foto=document.getElementById("foto").value;
    stelle="0";

    if(titolo=="" || tempo=="" || difficolta=="" || ingredienti == "" || procedimento=="" || foto==""){
        alert("tutti i campi sono obbligatori");
        return false;
    }

    if(isNaN(tempo)){ 
        alert("il tempo deve avere un valore numerico");
        return false;
    }
    if(isNaN(difficolta)){ 
        alert("la difficolta deve avere un valore numerico");
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
        alert("la ricetta è stata aggiunta correttamente");
        window.location.href="./grafica.html";
    }

}


function verificaLogin(){
    if(JSON.parse(sessionStorage.getItem('Loggato'))=='si'){
        return true;
    }
    else{
        return false;
    }
}

function valutaRicetta(){
    if(verificaLogin()){
        alert("sei loggato");
        $("#formValuta").css("display", "block");
    }
    else{
        alert("per valutare la ricetta devi essere loggato");
    }
}

let numeroStella=0;

function colora(n){

    for(i=n; i>0; n--){
        var imm=document.getElementById(n)
        imm.src="star-on.png";
    }
    return n;
}

function decolora(n){
    if (numeroStella==0){
        for(i=n; i>0; n--){
            var imm=document.getElementById(n)
            imm.src="star-off.png";
        }
    }
    alert(numeroStella);
    return n;
}



function salvaNumStella(n){
    numeroStella=n;
    
}

function mandaValutazione(){
    if(numeroStella==0){
        alert("inserire una valutazione");
    }
    else{
        var index=JSON.parse(sessionStorage.getItem('indiceRicetta'));
        var listaRicette=JSON.parse(localStorage.getItem('Ricette'));
        var ricettaScelta= listaRicette[index];
        alert(JSON.stringify( ricettaScelta));
        listaRicette.pop(ricettaScelta);
        var media= ricettaScelta.stelle;
        var nuovaMedia;
        alert(media);
        if(media != 0){
            nuovaMedia= (numeroStella+media)/2;
            
        }
        else{
            nuovaMedia=numeroStella;
            
        }
        alert(nuovaMedia);
        ricettaScelta.stelle=nuovaMedia;
        listaRicette[index]=ricettaScelta;
        localStorage["Ricette"]=JSON.stringify(listaRicette);
        
        
        alert("ok baby");
    }
    
}