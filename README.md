# 🟡 StarVar

**StarVar** est une librairie TypeScript minimaliste pour déclarer une **mono-variable globale typée**, avec un système de **contrôle d’accès via un token ou "pass" fonctionnant à l'aide d'une ACL**.  
Pensée pour les moteurs de jeu et les applications front-end, StarVar offre une **simplicité maximale**, une **sécurité renforcée**, une **lisibilité accrue**, une **maintenance simplifiée**, de l'**encapsulation stricte** de l'écriture et l'**autocomplétion maximale**.

---

## 🚀 Installation

```bash
npm install starvar
pnpm install starvar
bun install stavar
```

## ✨ Pourquoi StarVar ?

-✅ Encapsulation stricte (pas de mutation sauvage)
-🧩 Typage fort et autocomplétion partout
-🔐 Écriture restreinte via des passes nommées
-⚡️ Zéro dépendance
-🧠 Compatible système réactif (effets, listeners, etc.)

## 🧪 Exemple minimal

```typescript
import { makeStarVar, makeStarVarRegistry } from "starvar";

const varConfigs = {
  life: makeStarVar(100, ["sys:life", "sys:collider"]),
  pos: makeStarVar({ x: 0, y: 0 }, ["sys:move", "sys:collider"]),
} as const;

const registry = makeStarVarRegistry(varConfigs);

// Lecture typée
const hp = registry.get.life(); // number

// Accès restreint à ceux qui possèdent le pass
const access = registry.getAllByPass("sys:collider");
access.set.life(80); // autorisé
const speed = 5;
const dt = 20;
access.set.pos(old => old + speed * dt); // autorisé

```

### 🧰 API
makeStarVar(initialValue, allowedPasses[])
Crée une configuration de variable star. À utiliser uniquement dans un objet de config passé à makeStarVarRegistry.

```typescript
const config = makeStarVar(0, ["sys:my-system"]);
```

**makeStarVarRegistry(configs)**
Construit le registre global à partir des configs typées, en générant automatiquement les accès typés.
```typescript
const registry = makeStarVarRegistry({
  score: makeStarVar(42, ["game:score"]),
});
```

**registry.get.varName()**
Accès en lecture seule (réactif prochainement).

**registry.getAllByPass(passName)**
Retourne un objet { get, set } contenant uniquement les variables autorisées pour ce pass.
Autocomplétion incluse.

### 🔒 Contrôle d’accès par pass
Chaque variable définit les passes autorisés à modifier sa valeur.
Un pass est simplement une string libre ("sys:xyz") et peut être associée à des classes.

```typescript 
class LaserBeam implements IGetSystemName<"sys:laser">{
  getSystemName() { return "sys:laser" }

  foobar() {
    const energy = makeStarVar(10, ["physics:core", this]);
  }
}

```

## 📘 Cas d’usage
- Moteurs de jeux offline (2D/3D)
- Prototypes d’architecture ECS
- Outils de simulation
- Librairies éducatives
- Projets sans Redux/Zustand mais avec état global

## 🛠 Stack technique
- 100% TypeScript
- Pas de dépendances
- Inspirée de Zustand, Robot3 et ACL

## 📄 Licence
MIT