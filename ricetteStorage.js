function funzioneLogoutRicetta(){
    window.location.href="./grafica.html";
}


function ricetta(titolo, tempo, difficolta, ingredienti, procedimento, foto ){
    this.titolo=titolo;
    this.tempo=tempo;
    this.difficolta=difficolta;
    this.ingredienti=ingredienti;
    this.procedimento=procedimento;
    this.foto=foto;
}

function aggiungi(){
    titolo=document.getElementById("titolo").value;
    tempo=document.getElementById("tempo").value;
    difficolta=document.getElementById("difficolta").value;
    ingredienti=document.getElementById("ingredienti").value;
    procedimento=document.getElementById("procedimentoRicetta").value;
    foto=document.getElementById("foto").value;


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
        var r= new ricetta(titolo, tempo, difficolta, ingredienti, procedimento, foto);
       
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





