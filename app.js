//display the equation
function dis(temp)
{
    document.getElementById("result").value += temp
}

function solve(){

    let x = document.getElementById("result").value
    let y = eval(x)
    document.getElementById("result").value = y
}

function clr(){

    document.getElementById("result").value = ""

}
