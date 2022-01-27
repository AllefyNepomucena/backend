const { request, response } = require('express')
const cors = require('cors')
const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(cors())
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
/**MIDDLEWARE
 *
 * Intercepitador de Requisições que Interrompe Totalmente a Requisição ou Alterar Dados
 */
const projects = []

function logRequest(request, response, next) {
  const { method, url } = request
  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel)

  next() //Próximo Middleware

  console.timeEnd(logLabel)
}

function validateProjectId(request, response, next) {
  const { id } = request.params
  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid Project Id.' })
  }
  return next()
}

app.use(logRequest)

app.get('/projects', (request, response) => {
  const { title } = request.query
  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects
  return response.json(results)
})
app.post('/projects', (request, response) => {
  const { title, owner } = request.body

  const project = { id: uuid(), title, owner }

  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', validateProjectId, (request, response) => {
  const { title, owner } = request.body
  const { id } = request.params
  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) {
    return response.status(400).json({ Error: 'Project not found' })
  }
  project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project

  return response.json(project)
})

app.delete('/projects/:id', validateProjectId, (request, response) => {
  const { id } = request.params
  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) {
    return response.status(400).json({ Error: 'Project not found' })
  }
  projects.splice(projectIndex, 1)
  return response.status(204).send()
})
app.listen(3333, () => {
  console.log('Funcionou Caralhooo🚀')
})
