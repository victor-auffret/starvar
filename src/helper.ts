import { StarVar } from "./core.js"
import { StarVarRegistry } from "./registry.js"
import { None, Pass, Result, Some } from "./types.js"

const ALREADY_DEFINED = "already_defined"

export function extractPass<T extends string = string>(pass: Pass<T>) {
  return (typeof pass == "string") ? pass : pass.getSystemName() as T
}

export function defineStarVar<T>(name: string, val: T, pass: string[] = []): Result<StarVar<T>, typeof ALREADY_DEFINED> {
  if (!StarVarRegistry.memory.has(name)) {
    const ultra = new StarVar(val, pass)
    StarVarRegistry.memory.set(name, ultra)
    return { ok: true, value: ultra } as Some<StarVar<T>> 
  }
  return { ok: false, error: "already_defined" } as None<typeof ALREADY_DEFINED>
}

export function useStarVar(pass: Pass) {
  let mdp = extractPass(pass)

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

