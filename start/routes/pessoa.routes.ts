
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get('/', 'PessoasController.index')
    Route.get('/:id', 'PessoasController.show')
    Route.post('/', 'PessoasController.create')
    Route.put('/:id', 'PessoasController.update')
    Route.delete('/:id', 'PessoasController.delete')
}).prefix('pessoas')