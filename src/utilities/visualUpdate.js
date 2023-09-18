class VisualUpdate extends Destroy {
      toggleClass(coordinates) {
            const temporary =
                  this.playerBoardMatrix[coordinates[0]][coordinates[1]];
            temporary.node.classList.toggle(this.currentTetromino.colorClass);
      }
}
