//display the equation
function dis(x)
{
    document.getElementById("result").value += x
}

function solve(){

    let x = document.getElementById("result").value
    let y = eval(x)
    document.getElementById("result").value = y
}

function clr(){

    document.getElementById("result").value = ""

}
