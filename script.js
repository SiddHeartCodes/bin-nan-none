
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function handleClick(element)
{
    if(element.innerText!="")
    {
        document.getElementById("head").innerText="Already filled!"
        document.getElementById("head").style.color="white"
        await sleep(500)
        document.getElementById("head").style.color="rgb(41, 225, 56)"
        changeHead()
        
    }
    else if (turn=="1")
    {
        
    element.textContent="1"
    turn="2"
    }
    else
    {
        element.textContent="0"
        turn="1"
    }
    changeHead()
}

function reloadPage() {
    location.reload();
}


function changeHead(){
    let head=document.getElementById("head")
    if (turn=="1"){
        head.textContent="Player 01's Turn"
    }
    else
    {
        head.textContent="Player 10's Turn"
    }   


}
turn="1"