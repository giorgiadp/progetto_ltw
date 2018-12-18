
function funzioneCerca(){
    
    var storageIngredienti=JSON.parse(localStorage.getItem('Ricette'));
    var stringaIngredienti=document.getElementById("ingredienti").value;
    var listaIngredienti= stringaIngredienti.replace(/ /g, '').split(',');

    //conto quanti degli ingredienti che sto cercando stanno in ogni ricetta
    //quindi mi serve una lista con numero ricetta j e count
    //ritorno la ricetta che ce ne ha di piu in comune o niente 
    
    //ciclo sulle ricette dello storage
    var list=[];
    if(stringaIngredienti==""){
        alert("Inserisci almeno un ingrediente valido.");
        return false;
    }
    if(storageIngredienti != null){
        for(j=0; j<storageIngredienti.length; j++){
            //faccio divetare la stringa array
            var arrayStorage=storageIngredienti[j].ingredienti.replace(/ /g, '').split(',');
            //ciclo su ingredienti di ricetta j 
            c=0;
            for(k=0; k<arrayStorage.length; k++){
                //ciclo sulla lista degli ingredienti cercati
                for (i=0; i<listaIngredienti.length; i++){ 
                    if(arrayStorage[k] == listaIngredienti[i]){
                        c++;
                    }
                }
            }
            var elem=[j,c];
            list.push(elem);
        }
    
        //trovo la ricetta con il massimo degli ingredienti in comune
        var max=0;
        var ricMax=0
        for (i=0; i<list.length; i++){
            if(list[i][1] > max){
                max=list[i][1];
                ricMax=list[i][0];
            }
        }

        if (max==0){
            alert("Ricetta non trovata! Puoi inserire la tua dopo aver fatto l'accesso.");
        }
        else{
            sessionStorage.setItem('indiceRicetta', JSON.stringify( ricMax));
            window.location.href="./ricette.html";   
        }
    }
    else{
        alert("Non sono presenti ricette per gli ingredienti selezionati! Aggiungine una.");
    }

}

function mostraRicetta(){
    cambiabottoniRicetta();
    var index=JSON.parse(sessionStorage.getItem('indiceRicetta'));
    var stoRic= JSON.parse(localStorage.getItem('Ricette'))[index];

    document.getElementById('titolo').value= stoRic.titolo;
    document.getElementById('tempo').value= stoRic.tempo;
    document.getElementById('difficolta').value= stoRic.difficolta;
    document.getElementById('ingredienti').value= stoRic.ingredienti;
    document.getElementById('procedimento').value= stoRic.procedimento;
    document.getElementById('foto').src= stoRic.foto;
    stampaStelle(stoRic.stelle);
    $("#valuta").css("display", "none");
}

function stampaStelle(n){
    for(i=6; i<n+5; i++){
        var imm=document.getElementById(i);
        imm.src="star-on.png";
    }
    
}

function funzioneIscriviti(){
    window.location.href="./iscriviti.html";
}

function funzioneAccedi(){
    window.location.href="./accedi.html";
}

function cambiabottoniRicetta(){
    var s=JSON.parse(sessionStorage.getItem('Loggato'));
    if(s == 'si'){
        document.getElementById("pulsanti").style.display="none"
        document.getElementById("pulsanteLogout").style.display="block"

    }
    else {
        document.getElementById("pulsanti").style.display="block"
        document.getElementById("pulsanteLogout").style.display="none"
    }
        
}

function cambiabottoni(){
    var s=JSON.parse(sessionStorage.getItem('Loggato'));
    if(s == 'si'){
        document.getElementById("pulsanti").style.display="none"
        document.getElementById("pulsanteLogout").style.display="block"
        document.getElementById("aggiungiRicetta").style.display="block"

    }
    else {
        document.getElementById("pulsanti").style.display="block"
        document.getElementById("pulsanteLogout").style.display="none"
        document.getElementById("aggiungiRicetta").style.display="none"
    }
        
}

function funzioneLogout(){
    sessionStorage.setItem('Loggato', JSON.stringify("no"));
    document.getElementById("pulsanti").style.display="block"
    document.getElementById("pulsanteLogout").style.display="none"
    document.getElementById("aggiungiRicetta").style.display="none"
    confirm("Sei sicuro di voler uscire?");
} 

function aggiungiRicetta(){
    window.location.href="./aggiungiRicetta.html"
}

function funzioneHome(){
    window.location.href="./grafica.html";
}