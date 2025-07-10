import { StarVar } from "./core"
import { NOT_FOUND } from "./error";
import { IGetSystemName, None, Pass, Result, Some } from "./types"

type Varname = string


export class StarVarRegistry {

  static memory: Map<Varname, StarVar<any>> = new Map()

  static getAllByPass(pass: Pass): Map<Varname, StarVar<any>> {
    let mdp = typeof pass === "string" ? pass : (pass as IGetSystemName<Varname>).getSystemName();
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