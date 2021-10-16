const { request, response } = require('express')
const express = require('express')

const app = express()
app.use(express.json())
/**MÉTODOS HTTP
 *
 * GET: Buscar informações no back-end
 * POST: Criar uma informação no back-end
 * PUT/PACHT: Alternar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */
/**
 * TIPOS DE PARÂMETROS
 * Query Params: Filtros e Paginação
 * Route Params: Identifiacar recursos (Atualizar/Deletar)
 * Request Params: Conteúdo na hora de criar ou editar um recurso(JSON)
 */
app.get('/projects', (request, response) => {
  const { title, owner } = request.query

  console.log(title)
  console.log(owner)

  return response.json(['Projeto 1', 'Projeto 2'])
})
app.post('/projects', (request, response) => {
  const { title, owner } = request.body
  console.log(title)
  console.log(owner)
  return response.json(['Projeto 1', 'Projeto 2', 'Projeto 3'])
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params
  console.log(id)
  return response.json(['Projeto 4', 'Projeto 2', 'Projeto 3'])
})

app.delete('/projects/:id', (request, response) => {
  return response.json(['Projeto 2', 'Projeto 3'])
})
app.listen(3333, () => {
  console.log('Funcionou Caralhooo🚀')
})
