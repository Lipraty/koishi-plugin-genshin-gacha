import { Context, Schema } from 'koishi'

type CardLevel = 'S' | 'R' | 'N'

class GenshinGacha {
  public readonly name = 'genshin-gacha'
  private probability = {
    activity: [151, 1282, 8567],
    weapon: [156, 1498, 8346],
    permanent: [213, 1387, 8400]
  } as const

  constructor(ctx: Context, config: GenshinGacha.Config) {

  }

  private select(pool: keyof typeof this.probability) {
    const hit = Math.ceil(Math.random() * 10000 + 1)
    const _p = this.probability[pool]
    const _c: CardLevel[] = ['S', 'R', 'N']
    let start = 0
    let end = _p.length - 1
    while (start < end) {
      let mid = Math.floor((start + end) / 2)
      if (hit > _p[mid] && hit <= _p[mid + 1]) {
        return _c[mid + 1]
      } else if (hit > _p[mid + 1]) {
        start = mid
      } else {
        end = mid
      }
      return _c[0]
    }
  }
}

namespace GenshinGacha {
  export interface Config { }
  export const Config: Schema<Config> = Schema.object({})
}

export default GenshinGacha
