import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Profissao from './Profissao';

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: String

  @column()
  public telefone: String

  @column()
  public email: String

  @column()
  public isDeleted: boolean

  @column()
  public profissaoId: boolean

  @belongsTo(() => Profissao)
  public profissao: BelongsTo<typeof Profissao>

  @column.dateTime({ autoCreate: true, autoUpdate: false })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
