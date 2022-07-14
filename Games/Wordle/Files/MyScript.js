var ans = "";var acol = 0;var arow = 0;var playing = 0;

window.addEventListener('keydown',(evt)=>{
    if (!playing){
        return;
    }
    let k = evt.code;
    Controller(k);
});
function Controller(k){
    if (k == "Enter" || k == "NumpadEnter"){
        if (acol == 5){
            let w = "";
            for (let i=0;i<5;i++){
                w+= document.getElementById("R"+ arow + "C" + i).innerHTML;
            }
            if (dict.includes(w.toLowerCase())){
                for (let i =0; i<5; i++){
                    if (w.charAt(i).toLowerCase() == ans.charAt(i)){
                        document.getElementById("R"+ arow + "C" + i).style.backgroundColor = "green";
                        if (document.getElementById("Key" + w.charAt(i)).style.backgroundColor == "white"){
                            document.getElementById("Key" + w.charAt(i)).style.backgroundColor = "green";
                        }
                    }else if(ans.includes(w.charAt(i).toLowerCase())){
                        document.getElementById("R"+ arow + "C" + i).style.backgroundColor = "yellow";
                        if (document.getElementById("Key" + w.charAt(i)).style.backgroundColor == "white"){
                            document.getElementById("Key" + w.charAt(i)).style.backgroundColor = "yellow";
                        }
                    }else{
                        document.getElementById("R"+ arow + "C" + i).style.backgroundColor = "grey";
                        if (document.getElementById("Key" + w.charAt(i)).style.backgroundColor == "white"){
                            document.getElementById("Key" + w.charAt(i)).style.backgroundColor = "grey";
                        }
                    }
                }
                if (ans == w.toLowerCase()){
                    alert("Congratulations you solved it in " + (arow+1) + " guesses!");
                    playing = 0;
                }else{
                    arow++;
                    acol = 0;
                    if (arow == 6){
                        alert("Oops! The correct word was " + ans + ". Better Luck next time");
                        playing = 0;
                    }
                }
            }else{
                for (let i = 0; i < 5; i++){
                    document.getElementById("R"+ arow + "C" + i).innerHTML = "";
                }
                acol = 0;  
            }
        }else{
            for (let i = 0; i < acol; i++){
                document.getElementById("R"+ arow + "C" + i).innerHTML = "";
            }
            acol = 0;
        }
    }else if (k == "Backspace"){
        if (acol > 0){
            acol--;
            document.getElementById("R" + arow + "C" + acol).innerHTML = "";
        }
    }else if (k.startsWith("Key")){
        k = k.slice(3);
        if (acol < 5 && arow < 6){
            document.getElementById("R" + arow + "C" + acol).innerHTML = k;
            acol++;
        }
    }
}
function KeyInput(x){
    Controller(x);
}
function initialize(){
    // Creating Game area
    let pa = document.getElementById("PlayArea");
    pa.innerHTML = "";
    let str = "<table id='Grid'>";
    for (let i = 0; i<6; i++){
        str+= "<tr>";
        for (let j=0;j<5;j++){
            str += "<td id='R"+i+"C"+j+"' class = 'Gcell'></td>";
        }
        str+= "</tr>";
    }
    str+= "</table>";
    pa.innerHTML = str;
    document.getElementById("Keyboard").style.display = "block";
    let keys = document.getElementsByClassName("key");
    for (let i=0;i<keys.length; i++){
        keys[i].style.backgroundColor = "white";
    }
    // Loading game variables
    playing = 1;
    acol = 0;
    arow = 0;
    ans = toGuess[Math.floor(Math.random()*toGuess.length)];
}

function NewGame(){
    // Clear Input Fields

    for (let i=1;i<=6;i++){
        document.getElementById("R"+i+"Word").value="";
        for (let j=1;j<=5;j++){
            document.getElementById("PWR"+i+"C"+j).innerHTML="";
            document.getElementById("PWR"+i+"C"+j).style.backgroundColor="white";
        }
    }
    // Clear Keyboard Formatting
    let str = "QWERTYUIOPASDFGHJKLZXCVBNM";
    for (let i=0;i<26;i++){
        document.getElementById("Key"+str.charAt(i)).style.backgroundColor="white";
    }

    // Get New Word
    let wordindex=0;
    try{
        if (localStorage.getItem("WI").length>0){
            wordindex = Number.parseInt(localStorage.getItem("WI"));
            wordindex = wordindex+1;
            localStorage.removeItem("WI");
            localStorage.setItem("WI",wordindex);
        }
    }catch{
    }
    if (wordindex==0){
        localStorage.setItem("WI",0);
    }
    myWord = words[wordindex];
    document.getElementById("GameStatus").innerHTML = "Game Loaded";
}
function EnterWord(x){
    let w = document.getElementById("R"+x+"Word").value;
    for (let i=1;i<=5;i++){
        document.getElementById("PWR"+x+"C"+i).innerHTML=w.charAt(i-1).toUpperCase();
    }
    document.getElementById("PWEnter"+x).focus();
}
function VerifyWord(x){
    if (myWord!=""){
        let w=document.getElementById("R"+x+"Word").value;
        for (i=0;i<5;i++){
            if (w.charAt(i)==myWord.charAt(i)){
                document.getElementById("PWR"+x+"C"+(i+1)).style.backgroundColor="green";
                document.getElementById("Key"+w.charAt(i).toUpperCase()).style.backgroundColor="yellow";                
            }else if (myWord.includes(w.charAt(i))==1){
                document.getElementById("PWR"+x+"C"+(i+1)).style.backgroundColor="yellow";
                document.getElementById("Key"+w.charAt(i).toUpperCase()).style.backgroundColor="yellow";                
            }else{
                document.getElementById("PWR"+x+"C"+(i+1)).style.backgroundColor="grey";
                document.getElementById("Key"+w.charAt(i).toUpperCase()).style.backgroundColor="gray";                
            }
        }
        if (w==myWord) {
            Victory(x);
            document.getElementById("R"+(x+1)+"Word").focus();
        }

        else Defeat(x);

    }else{
        alert("Press New Game!");
    }
}
function Victory(y){
    alert("Wonderful! You solved it in "+y+" guesses.");
    myWord="";
    document.getElementById("GameStatus").innerHTML = "No Game Loaded";
    document.getElementById("NewGame").focus();
}
function Defeat(y){
    if (y==6){
        alert ("Better Luck Next Time, The word was : " + myWord);
        myWord="";
        document.getElementById("GameStatus").innerHTML = "No Game Loaded";
        document.getElementById("NewGame").focus();
    }
    else{
        document.getElementById("R"+(y+1)+"Word").focus();
    }

}
