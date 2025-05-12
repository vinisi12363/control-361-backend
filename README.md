# Desafio Técnico Control 361 (Backend)

###### O Desafio Consiste em uma listagem de Veículos além de uma visualização dos veículos rastreados no Maps, incluindo filtragem e seleção da listagem.

###### Esta aplicação foi elaborada para ser uma api intermediaria entre a api principal (disponibilizada pela empresa), e o client com  a finalizada de realizar o gerenciamento e tratamento dos dados retornados.

<br>

## Tencnologias utilizadas

#### Listarei as principais ferramentas que foram utilizadas  para ajudar na realização do desafio abaixo: 

- Nest JS
- Jest
- Redis
- Cache
- Swagger

#### Para ter acesso ao front do desafio clique no link abaixo: 

- [control-361-frontend.vercel.app/](https://control-361-frontend.vercel.app/)

#### Fique a vontade para dar uma olhada no funcionamento geral clicando abaixo:

[Apresentação do sistema](https://www.loom.com/share/9c2578ffa43c4632a6ffb25a5faa0870?sid=9ba76f9c-be93-413b-bb68-6cf275b54f48)

### Acesse a documentação da API clicando abaixo:

[Documentação](https://control-361-backend.onrender.com/api)

### Para executar o desafio localmente:

Após efetuar o clone do respoitório em sua máquina, dentro da pasta execute os comandos abaixo:

<br>

1- crie um arquivo ``.env`` contendo o seguinte: 

```env

VEHICLE_API_URL=https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate

VEHICLE_API_URL_DEFAULT_PARAMS=https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate?type=tracked&page=1&perPage=2

API_AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0MTVmOWE3LTk0ZmEtNDBmYy04Nzc3LWU3YTMxNzVjYmYwZCIsIm5hbWUiOiJJc2FiZWxsaSBOYXZhcnJvIiwiZG9jdW1lbnQiOiIzNTgwNzI0NTI1MyIsImVtYWlsIjoidGVzdGVAdHJhLmNvbSIsInBob25lIjoiMTE5Nzc4OTY1NDMiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc01hc3RlciI6dHJ1ZSwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9jbmQtdHJ1Y2tlcnBheS5zZm8zLmRpZ2l0YWxvY2VhbnNwYWNlcy5jb20vcm90b2dyYW1hLzZlOWFjYjIxMWI4NTFjYjBiMGZiZGNkMTVjZTFiODFjLndlYnAiLCJjb3Jwb3JhdGVJZCI6IjEzM2MzZWVlLTA2NDktNDY1Yi1hZWUyLWQ1N2FjZjViNWIyZiIsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTFUMTM6MDA6MjMuNjk3WiIsInBlcm1pc3Npb25zIjpbImRyaXZlci1saW5rLWRlbGV0ZSIsImRhc2hib2FyZCIsImRyaXZlciIsImRyaXZlci1yZWdpc3RyYXRpb25zLWludml0ZSIsImRyaXZlci11bmxpbmsiLCJkcml2ZXItbGluay1jcmVhdGUiLCJkcml2ZXItbGluay1lZGl0IiwidmVoaWNsZS1yZWdpc3RyYXRpb25zIiwidmVoaWNsZS1yZWdpc3RyYXRpb25zLXZpZXciLCJ2ZWhpY2xlLXJlZ2lzdHJhdGlvbnMtZWRpdCIsInZlaGljbGUtcmVnaXN0cmF0aW9ucy1lZGl0IiwidmVoaWNsZS1yZWdpc3RyYXRpb25zLWRlbGV0ZSI6InZlaGljbGUtcmVnaXN0cmF0aW9ucy1kZWxldGUiLCJwbGFjZXMiLCJwbGFjZXMtdmlldyIsInBsYWNlcy1lZGl0IiwicGxhY2VzLXJlZ2lzdGVyIiwicGxhY2VzLWRlbGV0ZSIsInJvdXRlcyIsInJvdXRlcy1yZWdpc3RlciIsInJvdXRlcy1kZWxldGUiLCJyb3V0ZXMtZWRpdCIsInJvdXRlcy12aWV3IiwidHJpcHMiLCJ0cmlwcy12aWV3IiwidHJpcHMtY2FuY2VsIiwidHJpcHMtZWRpdCIsInRyaXBzLWRlbGV0ZSIsInRyaXBzLWNoYXQiLCJyZXBvcnRzIiwicmVwb3J0cy12aWV3IiwicmVwb3J0cy1kb3dubG9hZCIsImFsZXJ0LWNvbmZpZ3VyYXRpb24iLCJhbGVydC1jb25maWd1cmF0aW9uLXZpZXciLCJvcGVyYXRvcnMiLCJvcGVyYXRvcnMtY3JlYXRlIiwib3BlcmF0b3JzLXZpZXciLCJhbGVydHMiLCJhbGVydHMtdmlldyIsIm9wZXJhdG9ycy1lZGl0Iiwib3BlcmF0b3JzLWRlbGV0ZSIsInBlcm1pc3Npb25zIiwicGVybWlzc2lvbnMtdmlldyIsInBlcm1pc3Npb25zLWVkaXQiLCJwZXJtaXNzaW9ucy1kZWxldGUiLCJwZXJtaXNzaW9ucy1jcmVhdGUiLCJpcy1jYXJyaWVyIiwidHJpcHMtY3JlYXRlIiwiY2hlY2tsaXN0IiwiY2hlY2tsaXN0LXZpZXciLCJjaGVja2xpc3QtdG8tY29tcGxldGUiXSwiaWF0IjoxNzQ2NTg0NTEyLCJleHAiOjE3NDc0NDg1MTJ9.qFYx9A8CDyvnYQlKItnaAsfulDhdE2aWeaTAoycS-yY

PORT=3000

API_KEY=S9o5BvoGWf2lcgFsxbI7aWSuds8XkQlPjJQivsOoqdJt2CAcu7sjSBzRjw6oYHzc

API_URL=https://control-361-backend.onrender.com

```

2- execute a sequencia de comandos abaixo:

```js
$ npm install 
```
```js
$ npx eslint init
```
```js
$ npm run start:dev
```

3- pronto, seu projeto está instalado e executando localmente. 🎉

#### para acessar o repositório do frontend acesse: 


[Backend repo](https://github.com/vinisi12363/control-361-frontend)

