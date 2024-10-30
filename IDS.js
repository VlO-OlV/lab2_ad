function generateBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board.push(Math.floor(Math.random() * 8));
  }
  return board;
}

function drawBoard(board) {
  let boardView = '';
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board.length; column++) {
      boardView += board[row] == column ? 'Q ' : '+ ';
    }
    boardView += '\n';
  }
  console.log(boardView);
}

function isSolved(board) {
  for (let queen = 0; queen < board.length; queen++) {
    if (board.filter((column) => column == board[queen]).length > 1) {
      return false;
    }
    for (let otherQueen = queen + 1; otherQueen < board.length; otherQueen++) {
      if (queen != otherQueen && (otherQueen + board[otherQueen] == queen + board[queen] || otherQueen - queen == board[otherQueen] - board[queen])) {
        return false;
      }
    }
  }
  return true;
}

function LDFS(currentBoard, depth) {
  let steps = 0;
  let nodes = 0;

  if (isSolved(currentBoard)) return [currentBoard, steps, nodes];
  if (depth == 0) return [null, steps, nodes];

  const neighbors = [];
  steps++;
  for (let queen = 0; queen < currentBoard.length; queen++) {
    for (let column = 0; column < currentBoard.length; column++) {
      if (currentBoard[queen] != column) {
        let nextBoard = [...currentBoard];
        nextBoard[queen] = column;
        neighbors.push(nextBoard);
        nodes++;
      }
    }
  }
  
  for (let nextBoard = 0; nextBoard < neighbors.length; nextBoard++) {
    let [result, extraSteps, extraNodes] = LDFS(neighbors[nextBoard], depth-1);
    steps += extraSteps;
    nodes += extraNodes;
    if (result) return [result, steps, nodes];
  }
  return [null, steps, nodes];
}

function IDS() {
  let depth = -1;
  let result = null;
  let steps = 0;
  let nodes = 0;
  let board = generateBoard();
  console.log('Initial board:');
  drawBoard(board);
  while (!result) {
    depth++;
    let extraSteps;
    [result, extraSteps, nodes] = LDFS(board, depth);
    steps += extraSteps;
  }
  const maxNodesInMemory = 56 * depth + 1;
  return [result, steps, maxNodesInMemory, nodes + 1];
}

const solution = IDS();

console.log('Solution:');
drawBoard(solution[0]);
console.log('Total steps:', solution[1]);
console.log('Max amount of nodes in memory:', solution[2]);
console.log('Total generated nodes:', solution[3]);