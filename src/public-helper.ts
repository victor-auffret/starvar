import { Pass } from "./types";

interface IUnamedStarvar<T> {

}

export const makeStarVar = function <T>(value: T, pass: Pass[] = []): IUnamedStarvar<T> {
  return {}
}
interface StarVarAccess {

}

interface StarVarRegistry {
  getAllByPass(pass: Pass): StarVarAccess
}

type StarVarConfig = {
  [var_name: string]: IUnamedStarvar<any>
}

export const makeStarVarRegistry = function (vars: StarVarConfig): StarVarRegistry {
  return {
    getAllByPass(pass: Pass): StarVarAccess {
      return {}
    }
  }
}

