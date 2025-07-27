"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

// 键盘键码常量
const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_ARROW_UP = 38;
const KEY_CODE_ARROW_DOWN = 40;

const tileColors = {
  2: { background: '#eee4da', color: '#776e65' },
  4: { background: '#ede0c8', color: '#776e65' },
  8: { background: '#f2b179', color: '#f9f6f2' },
  16: { background: '#f59563', color: '#f9f6f2' },
  32: { background: '#f67c5f', color: '#f9f6f2' },
  64: { background: '#f65e3b', color: '#f9f6f2' },
  128: { background: '#edcf72', color: '#f9f6f2', fontSize: '32px' },
  256: { background: '#edcc61', color: '#f9f6f2', fontSize: '32px' },
  512: { background: '#edc850', color: '#f9f6f2', fontSize: '32px' },
  1024: { background: '#edc53f', color: '#f9f6f2', fontSize: '24px' },
  2048: { background: '#edc22e', color: '#f9f6f2', fontSize: '24px' },
  'super': { background: '#3c3a32', color: '#f9f6f2', fontSize: '24px' }
} as Record<number | string, Record<string, string>>;

// 工具函数 - 创建空棋盘
const createEmptyBoard = () => {
  return Array(4).fill([]).map(() => Array(4).fill(0));
};
// 工具函数 - 随机添加新瓦片
const addRandomTile = (board: number[][]) => {
  const emptyCells: Array<{ row: number; col: number }> = [];

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        emptyCells.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  if (emptyCells.length === 0) return board;
  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  const newBoard = [...board];
  newBoard[row][col] = value;
  return newBoard;
};
// 初始化棋盘
const initializeBoard = () => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

function Fun2048Page() {

  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const gamBoardRef = useRef<HTMLDivElement>(null)


  const renderGrid = () => {
    const gridCells = [] as ReactNode[];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        gridCells.push(
          <div key={`grid-cell-${row}-${col}`} className="bg-[rgba(238, 228, 218, 0.35)] rounded-[4px]"></div>
        );
      }
    }
    return gridCells;
  };

  const renderTiles = () => {
    const tiles = [] as ReactNode[];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const value = board[row][col] as number;
        const style = {
          top: `calc(${row * 25}% + 12px)`,
          left: `calc(${col * 25}% + 12px)`,
          width: '21%',
          height: '21%',
          ...(tileColors[value] || tileColors.super),
          zIndex: Math.log2(value) || 1
        };
        if (value !== 0) {
          tiles.push(
            <div
              key={`tile-${row}-${col}`}
              className={cn(`
                absolute flex justify-center items-center font-bold text-[34px] rounded-[4px] transition-[transform,opacity] duration-[0.15s] ease-out
                `)}
              style={style}
            >
              {value}
            </div>
          )
        }
      }
    }
    return tiles;
  }

  // 检查游戏是否结束
  const checkGameOver = useCallback((board) => {
    // 检查是否有空位置
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          return false;
        }
      }
    }

    // 检查水平方向是否可以合并
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === board[row][col + 1]) {
          return false;
        }
      }
    }

    // 检查垂直方向是否可以合并
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (board[row][col] === board[row + 1][col]) {
          return false;
        }
      }
    }

    return true;
  }, []);

  // 检查游戏胜利
  const checkWin = useCallback((board) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 2048) {
          return true;
        }
      }
    }
    return false;
  }, []);

  // 移动棋盘逻辑 - 向左移动
  const moveLeft = useCallback((board) => {
    let newScore = score; 
    let moved = false;
    const newBoard = createEmptyBoard();

    for (let row = 0; row < 4; row++) {
      let currentCol = 0;
      let previousValue = null;

      for (let col = 0; col < 4; col++) {
        const value = board[row][col]; // 取出棋盘中的值
        if (value === 0) continue;

        if (previousValue === value) {
          // 合并瓦片
          const mergedValue = value * 2;
          newBoard[row][currentCol - 1] = mergedValue; // 将新的值给到棋盘左边一个的位置
          newScore += mergedValue;
          previousValue = null;
          moved = true;
        } else {
          // 移动瓦片
          newBoard[row][currentCol] = value;
          previousValue = value;
          if (currentCol !== col) moved = true;
          currentCol++;
        }
      }
    }

    return { board: newBoard, moved, score: newScore };
  }, [score]);

  // 移动棋盘逻辑 - 向右移动
  const moveRight = useCallback((board) => {
    let newScore = score;
    let moved = false;
    const newBoard = createEmptyBoard();

    for (let row = 0; row < 4; row++) {
      let currentCol = 3;
      let previousValue = null;

      for (let col = 3; col >= 0; col--) {
        const value = board[row][col];
        if (value === 0) continue;

        if (previousValue === value) {
          // 合并瓦片
          const mergedValue = value * 2;
          newBoard[row][currentCol + 1] = mergedValue;
          newScore += mergedValue;
          previousValue = null;
          moved = true;
        } else {
          // 移动瓦片
          newBoard[row][currentCol] = value;
          previousValue = value;
          if (currentCol !== col) moved = true;
          currentCol--;
        }
      }
    }

    return { board: newBoard, moved, score: newScore };
  }, [score]);

  // 移动棋盘逻辑 - 向上移动
  const moveUp = useCallback((board) => {
    let newScore = score;
    let moved = false;
    const newBoard = createEmptyBoard();

    for (let col = 0; col < 4; col++) {
      let currentRow = 0;
      let previousValue = null;

      for (let row = 0; row < 4; row++) {
        const value = board[row][col];
        if (value === 0) continue;

        if (previousValue === value) {
          // 合并瓦片
          const mergedValue = value * 2;
          newBoard[currentRow - 1][col] = mergedValue;
          newScore += mergedValue;
          previousValue = null;
          moved = true;
        } else {
          // 移动瓦片
          newBoard[currentRow][col] = value;
          previousValue = value;
          if (currentRow !== row) moved = true;
          currentRow++;
        }
      }
    }

    return { board: newBoard, moved, score: newScore };
  }, [score]);

  // 移动棋盘逻辑 - 向下移动
  const moveDown = useCallback((board) => {
    let newScore = score;
    let moved = false;
    const newBoard = createEmptyBoard();

    for (let col = 0; col < 4; col++) {
      let currentRow = 3;
      let previousValue = null;

      for (let row = 3; row >= 0; row--) {
        const value = board[row][col];
        if (value === 0) continue;

        if (previousValue === value) {
          // 合并瓦片
          const mergedValue = value * 2;
          newBoard[currentRow + 1][col] = mergedValue;
          newScore += mergedValue;
          previousValue = null;
          moved = true;
        } else {
          // 移动瓦片
          newBoard[currentRow][col] = value;
          previousValue = value;
          if (currentRow !== row) moved = true;
          currentRow--;
        }
      }
    }

    return { board: newBoard, moved, score: newScore };
  }, [score]);

  // 处理移动
  const handleMove = useCallback((direction) => {
    if (isMoving || gameOver) return;

    setIsMoving(true);

    let result;
    switch (direction) {
      case KEY_CODE_ARROW_UP:
        result = moveUp(board);
        break;
      case KEY_CODE_ARROW_DOWN:
        result = moveDown(board);
        break;
      case KEY_CODE_ARROW_LEFT:
        result = moveLeft(board);
        break;
      case KEY_CODE_ARROW_RIGHT:
        result = moveRight(board);
        break;
      default:
        return;
    }

    if (result.moved) {
      const newBoard = addRandomTile(result.board);

      setBoard(newBoard);
      setScore(result.score);

      if (result.score > bestScore) {
        setBestScore(result.score);
      }

      if (checkWin(newBoard)) {
        setWon(true);
      } else if (checkGameOver(newBoard)) {
        setGameOver(true);
      }
    }

    setIsMoving(false);
  }, [board, gameOver, isMoving, bestScore, moveUp, moveDown, moveLeft, moveRight, checkWin, checkGameOver]);

  // 键盘事件处理
  const handleKeyDown = useCallback((event) => {
    const directionKeys = [
      KEY_CODE_ARROW_UP,
      KEY_CODE_ARROW_DOWN,
      KEY_CODE_ARROW_LEFT,
      KEY_CODE_ARROW_RIGHT
    ];

    if (directionKeys.includes(event.keyCode)) {
      event.preventDefault();
      handleMove(event.keyCode);
    }
  }, [handleMove]);

  // 移动触摸处理
  const handleTouch = useCallback((start, end) => {
    if (!start || !end) return;

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      // 水平移动
      if (dx > 50) handleMove(KEY_CODE_ARROW_RIGHT);
      else if (dx < -50) handleMove(KEY_CODE_ARROW_LEFT);
    } else {
      // 垂直移动
      if (dy > 50) handleMove(KEY_CODE_ARROW_DOWN);
      else if (dy < -50) handleMove(KEY_CODE_ARROW_UP);
    }
  }, [handleMove]);

  // 组件挂载时设置事件监听
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    let touchStart: { x: number; y: number } | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      if (touchStart) {
        const touchEnd = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
        handleTouch(touchStart, touchEnd);
        touchStart = null;
      }
    };

    if (!gamBoardRef.current) return;
    if (gamBoardRef.current) {
      gamBoardRef.current.addEventListener('touchstart', handleTouchStart);
      gamBoardRef.current.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gamBoardRef.current) {
        gamBoardRef.current.removeEventListener('touchstart', handleTouchStart);
        gamBoardRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleKeyDown, handleTouch]);

  return (
    <div className="w-full max-w-[480px] p-[20px]">

      <div className="flex justify-between items-center mb-[20px]">
        <h1>2048</h1>
      </div>
      <div ref={gamBoardRef} className="relative bg-[#bbada0] rounded-[6px] p-[12px]">
        <div className="grid grid-cols-4 gap-[12px] w-full aspect-square">
          {renderGrid()}
        </div>
        <div className="absolute top-[12px] left-[12px] right-[12px] bottom-[12px]">
          {renderTiles()}
        </div>
      </div>
      {
        gameOver && <div>
          <p>{won ? '恭喜你赢了！' : '游戏结束！'}</p>
        </div>
      }

    </div>
  );
}

export default Fun2048Page;