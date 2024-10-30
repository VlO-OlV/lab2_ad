class Node {
  constructor(board, cost, heuristic) {
    this.board = [...board];
    this.cost = cost;
    this.heuristic = heuristic;
  }
}

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

function heuristic(board) {
  const example = [4, 6, 1, 3, 7, 0, 2, 5];
  let wrongPositions = 0;
  for (let queen = 0; queen < board.length; queen++) {
    if (board[queen] != example[queen]) {
      wrongPositions++;
    }
  }
  return wrongPositions;
}

function getNeighbors(node) {
  const neighbors = [];
  let { board, cost } = node;

  for (let queen = 0; queen < board.length; queen++) {
    for (let column = 0; column < board.length; column++) {
      if (board[queen] != column) {
        let nextBoard = [...board];
        nextBoard[queen] = column;
        let newNode = new Node(nextBoard, cost + 1, heuristic(nextBoard));
        neighbors.push(newNode);
      }
    }
  }
  return neighbors;
}

function AStar() {
  let maxNodesInMemory = 1;
  let steps = 0;
  let generatedNodes = 1;
  let initialBoard = generateBoard();
  console.log('Initial board:');
  drawBoard(initialBoard);
  let initialNode = new Node(initialBoard, 0, heuristic(initialBoard));
  let priorityQueue = [initialNode];

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
    maxNodesInMemory = maxNodesInMemory < priorityQueue.length ? priorityQueue.length : maxNodesInMemory;
    let currentNode = priorityQueue.shift();

    if (currentNode.heuristic == 0) return [currentNode.board, steps, maxNodesInMemory, generatedNodes];

    let neighbors = getNeighbors(currentNode);
    generatedNodes += neighbors.length;
    steps++;
    priorityQueue.push(...neighbors);
  }
  return [null, steps, maxNodesInMemory, generatedNodes];
}

const solution = AStar();
console.log('Solution:');
drawBoard(solution[0]);
console.log('Total steps:', solution[1]);
console.log('Max amount of nodes in memory:', solution[2]);
console.log('Total generated nodes:', solution[3]);
