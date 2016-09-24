var maze1 = {
  start: [0,1],
  data: [
    "OSXOXOXOO".split(""),
    "OXXOXOXGO".split(""),
    "OOOOOOXXO".split(""),
    "OOXOOOOOO".split("")
  ]
}
// var possibleOutput = "LDDRRRRDRRUUL".split("")
function isValid (newCoord, maze) {
  let row = newCoord[0]
  let col = newCoord[1]
  if (row < 0 || row >= maze.length) {
    return false
  }
  if (col < 0 || col >= maze[0].length) {
    return false
  }
  return true
}

function isNonCircular (path) {
  let lastCoord = path[path.length - 1]
  for (var i = 0; i < path.length - 1; i++) {
    if (path[i][0] === lastCoord[0] && path[i][1] === lastCoord[1]) {
      return false
    }
  }
  return true
}

function convertRoute( path ) {
  console.log(path)
  let directions = []
  for (var i = 0; i < path.length - 1; i++) {
    let current = path[i]
    let next = path[i + 1]
    if (current[0] !== next[0]) {
      // UP OR DOWN
      if (current[0] < next[0]) {
        directions.push('D')
      } else {
        directions.push('U')
      }
    } else {
      // LEFT OR RIGHT
      if (current[1] < next[1]) {
        directions.push('R')
      } else {
        directions.push('L')
      }
    }
  }
  return directions
}

function solveMaze(maze) {
  let queue = []
  let start = maze1.start
  let currentPath = [start]
  queue.push([start])

  // queue.push([...currentPath, [start[0], start[1] - 1]) // L
  // queue.push([...currentPath, [start[0], start[1] + 1]) // R
  // queue.push([...currentPath, [start[0] - 1, start[1]]) // U
  // queue.push([...currentPath, [start[0] + 1, start[1]]) // D

  while (queue.length) {
    let proposedPath = queue.shift()
    let newestCoord = proposedPath[proposedPath.length - 1]
    let row = newestCoord[0]
    let col = newestCoord[1]
    if (isValid(newestCoord, maze.data) && maze.data[row][col] !== 'X') {
      if (maze.data[row][col] === 'G') {
        return convertRoute(proposedPath)
      } else {
        // else add LRDU from this point (minus out of bounds, and previously traversed)
        let newPath = [...proposedPath, [newestCoord[0], newestCoord[1] - 1]] // L
        if (isNonCircular(newPath)) {
          queue.push(newPath)
        }
        newPath = [...proposedPath, [newestCoord[0], newestCoord[1] + 1]] // R
        if (isNonCircular(newPath)) {
          queue.push(newPath)
        }
        newPath = [...proposedPath, [newestCoord[0] - 1, newestCoord[1]]] // U
        if (isNonCircular(newPath)) {
          queue.push(newPath)
        }
        newPath = [...proposedPath, [newestCoord[0] + 1, newestCoord[1]]] // D
        if (isNonCircular(newPath)) {
          queue.push(newPath)
        }
      }
    }
  }
  return undefined

  // Format directions from winning coordinate route
}

console.log(solveMaze(maze1))
