const tabnames = ["Home","Games"];
function goToTab(name){
    for (let i=0;i<tabnames.length;i++){
        document.getElementById("Page-" + tabnames[i]).style.display= "none";
    }
    document.getElementById("Page-" + name).style.display= "block";
}
