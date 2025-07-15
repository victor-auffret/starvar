# starvar
mono variable global state with ACL for write 


todo : 
```typescript
const register = makeRegister({
  live: makeVar(5, ["sys:live"]),
  score: makeVar(10, ["sys:score"]),
  inGame: makeVar(false, ["sys:resume"])
})

register.get.live() // reactivité prochainement 

const access = register.access("sys:live")
access.set.live(old => old - 1)
``` 

