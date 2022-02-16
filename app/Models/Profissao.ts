import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pessoa from './Pessoa';

export default class Profissao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: String

  @column()
  public isDeleted: boolean

  @hasMany(() => Pessoa)
  public pessoas: HasMany<typeof Pessoa>

  @column.dateTime({ autoCreate: true, autoUpdate: false })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
