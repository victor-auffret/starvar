import { StarVar } from "./core"
import { ALREADY_DEFINED, NOT_FOUND } from "./error";
import { extractPass } from "./helper";
import { IGetSystemName, None, Pass, Result, Some } from "./types"

type Varname = string

export class StarVarRegistry {

  static memory: Map<Varname, StarVar<any>> = new Map()

  static register<T>(name: Varname, starvar: StarVar<T>): Result<StarVar<T>, typeof ALREADY_DEFINED> {
    if (!StarVarRegistry.has(name)) {
      StarVarRegistry.memory.set(name, starvar)
      return { ok: true, value: starvar } as Some<StarVar<T>>
    }
    return { ok: false, error: ALREADY_DEFINED } as None<typeof ALREADY_DEFINED>
  }

  static getAllByPass(pass: Pass): Map<Varname, StarVar<any>> {
    let mdp = extractPass(pass);
    let rep: Map<Varname, StarVar<any>> = new Map()
    StarVarRegistry.memory.forEach((val, name) => {
      if (val.canWrite(mdp)) {
        rep.set(name, val)
      }
    })
    return rep
  }

  static has(name: Varname): boolean {
    return StarVarRegistry.memory.has(name)
  }

  static get<T = any>(name: Varname): Result<StarVar<T>, typeof NOT_FOUND> {
    if (StarVarRegistry.has(name)) {
      return { ok: true, value: this.memory.get(name) as StarVar<T> } as Some<StarVar<T>>
    } else {
      return { ok: false, error: "not_found" } as None<typeof NOT_FOUND>
    }
  }

}
