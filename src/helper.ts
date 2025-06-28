import { StarVar } from "./core.js"
import { StarVarRegistry } from "./registry.js"
import { IGetSystemName, IStarVar } from "./types.js"

export function defineStarVar<T>(name: string, val: T, pass: string[] = []): IStarVar<T> | null {
  if (!StarVarRegistry.memory.has(name)) {
    const ultra = new StarVar(val, pass)
    StarVarRegistry.memory.set(name, ultra)
    return ultra
  }
  return null
}

export function useStarVar(pass: IGetSystemName | string) {
  let mdp: string = (typeof pass == "string") ? pass : pass.getSystemName()

  return {
    get: (name: string) => {
      if (StarVarRegistry.memory.has(name)) {
        return StarVarRegistry.memory.get(name)
      }
    },
    set: () => {
      let all = StarVarRegistry.getAllByPass(mdp)
      let rep = {}
      all.forEach((val, key) => {
        rep = { ...rep, [key]: val }
      })
      return rep
    }
  }
}

