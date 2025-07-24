import { StarVar } from "./core"
import { ALREADY_DEFINED, NOT_FOUND } from "./error"
import { extractPass } from "./private-helper"
import { StarVarRegistry } from "./registry"
import { None, Pass, Result, Some } from "./types"

export function defineStarVar<T>(name: string, val: T, pass: string[] = []): Result<StarVar<T>, typeof ALREADY_DEFINED> {
  if (!StarVarRegistry.memory.has(name)) {
    const ultra = new StarVar(val, pass)
    StarVarRegistry.memory.set(name, ultra)
    return { ok: true, value: ultra } as Some<StarVar<T>> 
  }
  return { ok: false, error: ALREADY_DEFINED } as None<typeof ALREADY_DEFINED>
}

export function useStarVarAccess(pass: Pass) {
  let mdp = extractPass(pass)

  return {
    get: (name: string) => StarVarRegistry.get(name),
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

export function useStarVarReadOnly<T>() {
  return {
    get: (name: string): Result<StarVar<T>, typeof NOT_FOUND> => {
      return StarVarRegistry.get<T>(name)
    }
  }
}

type optStarVarRegistry = { [var_name: string]: any }

export function createStarVarRegistry(opt: optStarVarRegistry) {
  return {}
}
