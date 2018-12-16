function funzioneCerca(){
    
    var storageIngredienti=JSON.parse(localStorage.getItem('Ricette'));

    var stringaIngredienti=document.getElementById("ingredienti").value;

    var listaIngredienti= stringaIngredienti.split(',');

    //conto quanti degli ingredienti che sto cercando stanno in ogni ricetta
    //quindi mi serve una lista con numero ricetta j e count
    //ritorno la ricetta che ce ne ha di piu in comune o niente 
    
    //ciclo sulle ricette dello storage
    var list=[];
    for(j=0; j<storageIngredienti.length; j++){
        //faccio divetare la stringa array
        var arrayStorage=storageIngredienti[j].ingredienti.split(',');
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
    max=0;
    ricMax=0
    for (i=0; i<list.length; i++){
        if(list[i][1] > max)
            max=list[i][1];
            ricMax=list[i][0];
    }

    if (max==0){
        alert("ricetta non trovata, puoi inserire la tua ricetta dopo aver fatto il login!");
    }
    else{
        alert("ricetta trovata  " + storageIngredienti[ricMax].titolo);
        mostraRicetta(storageIngredienti[ricMax]);
        
    }

}

function mostraRicetta(storageRicetta){
    alert("in mostraRicetta");
    titolo=storageRicetta.titolo;
    tempo=storageRicetta.tempo;
    difficolta=storageRicetta.difficolta;
    arrayIngredienti=storageRicetta.ingredienti;
    procedimento=storageRicetta.procedimento;
    foto=storageRicetta.procedimento;
    
    alert(titolo + tempo+ difficolta+ arrayIngredienti+ procedimento+ foto);
    //devo capire come fare a caricare elemnti su pagina diversa da quella di partenza
    window.location.href="./ricette.html";
}

function funzioneIscriviti(){
    window.location.href="./iscriviti.html";
}

function funzioneAccedi(){
    window.location.href="./accedi.html";
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
} 

function aggiungiRicetta(){
    window.location.href="./aggiungiRicetta.html"
}