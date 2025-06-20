let board=["","","","","","","","",""];
let currentPlayer="X";
let gameActive=true;
const cells=document.querySelectorAll(".cell");
const statusText=document.getElementById("status");
const winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
cells.forEach(cell=>cell.addEventListener("click",handleClick));
function handleClick(e){
    const index=e.target.dataset.index;
    if(board[index]!==""||!gameActive||currentPlayer!=="X")return;
    makeMove(index,"X");
    if(gameActive){
        setTimeout(aiMove,500);
    }
}
function makeMove(index,player){
    board[index]=player;
    cells[index].textContent=player;
    if(checkWin(player)){
        statusText.textContent='${player}wins!';
        gameActive=false;
    }else if(board.every(cell=>cell!=="")){
        statusText.textContent="It's a draw!";
        gameActive=false;
    }else{
        currentPlayer=player=="X"?"0":"X";
        statusText.textContent=currentPlayer=="X"?"Your turn(X)":"AI's turn(0)";
    }
}
function aiMove(){
    if(!gameActive)return;
    const emptyIndices=board.map((val,idx)=>val==""?idx:null).filter(val=>val!==null);
    if(emptyIndices.length==0)return;
    const randomIndex=emptyIndices[Math.floor(Math.random()*emptyIndices.length)];
    makeMove(randomIndex,"0");
}
function checkWin(player){
    return winConditions.some(condition=>condition.every(index=>board[index]==player));
}
function restartGame(){
    board=["","","","","","","","",""];
    gameActive=true;
    currentPlayer="X";
    statusText.textContent="Your turn(X)";
    cells.forEach(cell=>cell.textContent="");
}