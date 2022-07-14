/* Create Programs Here */
var gsz=7;
var sol = [];
var g = [];
var time = 0;
var ison = 0;
var inter = 0;
const ratio = 0.6;
function initialize(){
    // variable initialization
    time = 0;
    gsz = parseInt(document.getElementById("Gsize").value);
    if (gsz > 25 || gsz < 3){
        alert("Size should be between 3 and 25");
        return ;
    }
    g = [];
    sol = [];
    for (let i=0;i<gsz;i++){
        let m = [];
        for(let j=0;j<gsz;j++){
            m.push(0);
        }
        sol.push(m);
    }
    for (let i=0;i<gsz;i++){
        let m = [];
        for(let j=0;j<gsz;j++){
            m.push(0);
        }
        g.push(m);
    }
    // generating a random game
    let count = 0;
    while (count < ratio*gsz*gsz){
        let r = Math.floor(gsz*Math.random());
        let c = Math.floor(gsz*Math.random());
        if (sol[r][c]==0){
            sol[r][c]=1;
            count++;
        }
    }
    // Creating HTML elements
    let p = document.getElementById("PlayArea");
    let str = "<table id='Grid' cellspacing=0><tr><td></td>";
    for (let i=0;i<gsz;i++){
        str+= "<td id='Col"+i+"' class='col'></td>";
    }
    str+="</tr>";
    for (let i=0;i<gsz;i++){
        str+= "<tr><td id='Row"+i+"' class='row'></td>";
        for(let j=0;j<gsz;j++){
            str+="<td id='R"+i+"C"+j+"' onclick = 'mark("+i+","+j+")' style='cursor:pointer;'></td>";
        }
        str+="</tr>";
    }
    str+="</table>";
    p.innerHTML = str;
    // loading game to HTML elements
    for (let i=0;i<gsz;i++){
        str = "";
        count = 0;
        for(let j=0;j<gsz;j++){
            if (sol[i][j]==1){
                count++;
            }
            if (count!=0 && sol[i][j]==0){
                str = str + count + " ";
                count = 0;
            }
        }
        if (count!=0){
            str = str + count + " ";
            count = 0;
        }
        document.getElementById("Row"+i).innerHTML = str;
    }
    for (let i=0;i<gsz;i++){
        str = "";
        count = 0;
        for(let j=0;j<gsz;j++){
            if (sol[j][i]==1){
                count++;
            }
            if (count!=0 && sol[j][i]==0){
                str = str + count + "<br>";
                count = 0;
            }
        }
        if (count!=0){
            str = str + count + "<br>";
            count = 0;
        }
        document.getElementById("Col"+i).innerHTML = str;
    }
    clearInterval(inter);
    inter = window.setInterval(clockupdate,1000);
}
function clockupdate(){
        time++;
        document.getElementById("Timer").innerHTML = "Time : "+ Math.floor(time/3600) + ":" + Math.floor(time/60)%60 + ":" + time%60;
}
function mark(i,j){
    if (g[i][j]==0){
        g[i][j]=1;
        document.getElementById("R"+i+"C"+j).style.backgroundColor = "#0C0032";
    }else if (g[i][j]==1){
        g[i][j]=2;
        document.getElementById("R"+i+"C"+j).style.backgroundColor = "white";
        document.getElementById("R"+i+"C"+j).innerHTML = "&Cross;";
    }else if (g[i][j]==2){
        g[i][j]=0;
        document.getElementById("R"+i+"C"+j).innerHTML = "";
    }
    checkSolution(0);
}
function checkSolution(x){
    if (g.length==0){
        return;
    }
    for(let i=0;i<gsz;i++){
        for (let j=0;j<gsz;j++){
            if (g[i][j]%2!=sol[i][j]%2){
                if (x!=0) {
                    alert("INCORRECT :( ");
                }return;
            }
        }
    }
    clearInterval(inter);
    alert("Congratulations !! It is CORRECT!!");
}
function solve(){
    if (g.length==0){
        return;
    }
    for(let i=0;i<gsz;i++){
        for (let j=0;j<gsz;j++){
            document.getElementById("R"+i+"C"+j).innerHTML = "";
            if (sol[i][j]==1){
                document.getElementById("R"+i+"C"+j).style.backgroundColor = "#0C0032";
            }else{
                document.getElementById("R"+i+"C"+j).style.backgroundColor = "white";
            }
        }
    }
}
function reset(){
    for(let i=0;i<gsz;i++){
        for (let j=0;j<gsz;j++){
            document.getElementById("R"+i+"C"+j).innerHTML = "";
            document.getElementById("R"+i+"C"+j).style.backgroundColor = "white";
        }
    }
}

