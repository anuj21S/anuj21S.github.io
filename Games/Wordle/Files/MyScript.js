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
