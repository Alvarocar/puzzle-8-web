import { pushStep } from "./tree";

export class Node {
  constructor(state, parent, operator, depth, cost) {
    this.state = state;
    this.parent = parent;
    this.operator = operator;
    this.depth = depth;
    this.cost = cost;
  }

  getState = () => {
    return this.state;
  };

  getMoves = () => {
    return this.operator;
  };

  getDepth = () => {
    return this.depth;
  };

  pathFromStart = (goal) => {
    let stateList = [];
    let moveList = [];
    let currentNode = this;
    while (currentNode.getMoves()) {
      stateList.push(currentNode.getState());
      moveList.push(currentNode.getMoves());
      currentNode = currentNode.parent;
    }
    stateList.reverse();
    moveList.reverse();
    pushStep(goal);
    for (const item of stateList) {
      pushStep(item);
    }
    return moveList;
  };
  bs_pathFromStart = (backward) => {
    let stateList = [];
    let moveList = [];
    let forward = this;
    while (forward.getMoves()) {
      stateList.push(forward.getState());
      moveList.push(forward.getMoves());
      forward = forward.parent;
    }
    let backMoveList = [];
    let backStateList = [];
    while (backward.getMoves()) {
      backStateList.push(backward.getState());
      backMoveList.push(backward.getMoves());
      backward = backward.parent;
    }
    backStateList.push(backward.getState());
    backStateList.reverse();
    backStateList.reverse();
    stateList.reverse();
    moveList.reverse();
    backMoveList = backMoveList.map((move) => {
      switch (move) {
        case "up":
          return "down";
        case "down":
          return "up";
        case "left":
          return "right";
        case "right":
          return "left";
      }
    });
    stateList = [...stateList, ...backStateList];
    moveList = [...moveList, ...backMoveList];
    for (const item of stateList) {
      pushStep(item);
    }
    return moveList;
  };
}
