
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'ProfissaosController.index')
    Route.get('/com-associacao', 'ProfissaosController.getAllWithAssocietion')
    Route.get('/:id', 'ProfissaosController.show')
    Route.post('/', 'ProfissaosController.create')
    Route.put('/:id', 'ProfissaosController.update')
    Route.delete('/:id', 'ProfissaosController.delete')
}).prefix('profissoes')