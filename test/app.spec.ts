import test from 'japa'
import Profissao from '../app/Models/Profissao';

/**
 * O intuito destes testes é verificar se a app está a comunicar com o banco de dados corretamente
 */
test.group('Profissão', () => {
    test('Is Create', async (assert) => {
        const profissao = await Profissao.create({
            descricao: 'Project Manager'
        })
        assert.equal(profissao.descricao, 'Project Manager')
    })

    test('List all', async (assert) => {
        const profissoes = await Profissao.all()
        assert.isArray(profissoes)
    })

    test('Is Delete', async (assert) => {
        const profissoa = await Profissao.find(1)
        if (profissoa) {
            await profissoa.delete()
            assert.isTrue(profissoa.$isDeleted)
        }
    })
})
