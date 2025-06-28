import { IStarVar } from "./types.js"

export class StarVarRegistry {

  static memory: Map<string, IStarVar<any>> = new Map()

  static getAllByPass(pass: string): Map<string, IStarVar<any>> {
    let rep: Map<string, IStarVar<any>> = new Map()
    StarVarRegistry.memory.forEach((val, name) => {
      if (val.canWrite(pass)) {
        rep.set(name, val)
      }
    })
    return rep
  }

}