class GameStats {
      scoreNode;
      singleShotNode;
      doubleShotNode;
      tripleShotNode;
      stats;

      constructor() {
            this.scoreNode = document.querySelector("#score");
            this.singleShotNode = document.querySelector("#single-shot");
            this.tripleShotNode = document.querySelector("#triple-shot");
            this.doubleShotNode = document.querySelector("#double-shot");
            this.stats = {
                  score: 0,
                  singleShots: 0,
                  doubleShots: 0,
                  tripleShots: 0,
                  timeStamp: undefined,
            };
      }

      updateGameStats(numberOfBlasts) {
            this.stats.score += numberOfBlasts * (500 * numberOfBlasts);
            this.scoreNode.innerText = this.stats.score;
            if (numberOfBlasts == 1) {
                  this.stats.singleShots++;
                  this.singleShotNode.innerText = this.stats.singleShots;
            } else if (numberOfBlasts == 2) {
                  this.stats.doubleShots++;
                  this.doubleShotNode.innerText = this.stats.doubleShots;
            } else if (numberOfBlasts == 4) {
                  this.stats.tripleShots++;
                  this.stats.tripleShotNode = this.stats.tripleShots;
            }
      }
}
