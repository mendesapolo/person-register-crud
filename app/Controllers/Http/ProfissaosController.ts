import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profissao from '../../Models/Profissao';

export default class ProfissaosController {

    // Defaults messages for response
    public messages = {
        success: 'Sucesso :)',
        error: 'Erro no servidor, tente novamente. Se o erro persistir, chame a assistência técnica',
        wharning: 'Algo deu errado!!. Tente novamente',
    }

    public async index({ request, response }: HttpContextContract) {
        const page = request.input('page') || 1
        const perPage = request.input('perPage') || 10

        const profissaos = await Profissao.query().select('*')
            .where('isDeleted', false)
            .paginate(page, perPage)

        if (!profissaos) return response.badRequest({ message: this.messages.wharning })
        return response.ok(profissaos)
    }

    public async getAllWitAssocietion({ request, response }: HttpContextContract) {
        const page = request.input('page') || 1
        const perPage = request.input('perPage') || 10

        const profissaos = await Profissao.query()
            .select('*')
            .preload('pessoas')
            .where('isDeleted', false)
            .paginate(page, perPage)

        if (!profissaos) return response.badRequest({ message: this.messages.wharning })
        return response.ok(profissaos)
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const id = params.id
            const profissao = await Profissao.findOrFail(id)
            await profissao.load('pessoas')
            return response.ok(profissao)
        } catch (err) {
            return response.badRequest({ message: 'Profissão não encontrada' })
        }
    }

    public async create({ request, response }: HttpContextContract) {
        try {
            const descricao = request.input('descricao')
            if (!descricao) return response.badRequest({ message: 'A descrição é necesária' })
            if (await Profissao.findBy('descricao', descricao)) return response.badRequest({ message: 'Profissão já cadastrada' })

            await Profissao.create({ descricao })

            response.ok({ message: this.messages.success })
        } catch (err) {
            return response.badRequest({ message: this.messages.error })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const id = params.id
            const data = request.only(['descricao'])

            const profissao = await Profissao.findOrFail(id)
            if (!data.descricao) return response.badRequest({ message: 'A descrição é necesária' })

            profissao.merge(data)
            await profissao.save()

            return response.ok({ message: this.messages.success })
        } catch (err) {
            return response.badRequest({ message: this.messages.error })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const id = params.id
            const profissao = await Profissao.findOrFail(id)
            profissao.merge({ isDeleted: true })
            await profissao.save()

            return response.ok({ message: this.messages.success })
        } catch (err) {
            return response.badRequest({ message: this.messages.error })
        }
    }
}
