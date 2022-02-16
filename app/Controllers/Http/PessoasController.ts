import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pessoa from '../../Models/Pessoa';
import Profissao from '../../Models/Profissao';

export default class PessoasController {

    // Defaults messages for response
    private messages = {
        success: 'Sucesso :)',
        error: 'Erro no servidor, tente novamente. Se o erro persistir, chame a assistência técnica',
        wharning: 'Algo deu errado!!. Tente novamente',
    }

    public async index({ request, response }: HttpContextContract) {
        const page = request.input('page') || 1
        const perPage = request.input('perPage') || 10

        const pessoas = await Pessoa.query()
            .select('*')
            .preload('profissao')
            .where('isDeleted', false)
            .orderBy('createdAt', 'desc')
            .paginate(page, perPage)

        if (!pessoas) return response.badRequest({ message: this.messages.wharning })
        return response.ok(pessoas)
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const id = params.id
            const pessoa = await Pessoa.findOrFail(id)
            await pessoa.load('profissao')
            return response.ok({ data: pessoa })
        } catch (err) {
            return response.badRequest({ message: 'Pessoa não encontrada' })
        }
    }

    public async create({ request, response }: HttpContextContract) {
        try {
            const data = request.only(['nome', 'telefone', 'email'])
            const profissaoId: number = request.input('profissao_id')
            const profissao = await Profissao.find(profissaoId)
            if (!data.nome || !data.telefone || !profissao) return response.badRequest({ message: 'Dado(s) inválido(s), verifique todos os campos' })
            const pessoa = await Pessoa.create(data)
            await pessoa.related('profissao').associate(profissao)

            return response.ok({ message: this.messages.success })
        } catch (err) {
            return response.badRequest({ message: this.messages.error })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const id = params.id
            const data = request.only(['nome', 'telefone', 'email'])
            const profissaoId: number = request.input('profissao_id')
            const profissao = await Profissao.find(profissaoId)

            if (!data.nome || !data.telefone || !profissao) return response.badRequest({ message: 'Preencha todos os campos' })
            const pessoa = await Pessoa.find(id)
            if (!pessoa) return response.badRequest({ message: 'Pessoa não encontrada' })

            pessoa.merge(data)
            await pessoa.related('profissao').associate(profissao)
            await pessoa.save()

            return response.ok({ message: this.messages.success })
        } catch (err) {
            return response.status(500).json({ message: this.messages.error })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const id = params.id
            const pessoa = await Pessoa.find(id)
            if (!pessoa) return response.badRequest({ message: 'Pessoa não encontrada' })
            pessoa.isDeleted = true
            await pessoa.save()
            return response.ok({ message: this.messages.success })

            // Para deletar o registro na BD, basta desassociar a profissao
            // await pessoa.related('profissao').dissociate()
            // await pessoa.save()
            // await pessoa.delete()
            // return response.ok({ message: 'Pessoa eliminada com sucesso!' })

        } catch (err) {
            return response.badRequest({ message: this.messages.error })
        }
    }

}
