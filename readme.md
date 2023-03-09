# B7Delivery

<p  align="center"><img  src="https://img.shields.io/static/v1?label=Adonis&message=framework&color=blue&style=for-the-badge&logo=ADONISJS"/> <img  src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/></p>

Projeto B7Delivery :hammer: Em construção

# Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto:

```
git clone (link do projeto)
```

Faça a instalação das dependências

```
npm install
```

Faça uma cópia do arquivo `.env.example` com o nome de `.env` e as devidas alterações nas variaveis de ambiente, em as varaiveis de configuração de banco:

```md
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB_NAME=
```

Por fim, execute o migration para criar as tabelas no banco de dados

```
node ace migration:fresh
```

E rode o projeto em ambiente desenvolvimento, com o comando:

```
node ace serve --watch
```

## Build para Produção

Para fazer a build do projeto para produção, em seu arquivo `.env` altere o a variavel de ambiente para produção

```
NODE_ENV=production
```

em seguida, execute o comando

```
node ace build
```

# Endpoints / Documentação

## Usuário

### Cadastrar um novo Usuário - `POST: /auth/user/register`

Exemplo de <b>Payload</b>

```json
{
  "name": "Fulano da Silva",
  "email": "john@doe.com",
  "password": "123456"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "user": {
    /* ... Dados do usuário ... */
  },
  "token": {
    "type": "bearer",
    "token": "Mg.B-AYtGYMkgGOTGCZCb6shoFByiKJwLzFyIWK3ozDUpBiLict34b8weWnhg05"
  }
}
```

### Login do Usuário - `POST: /auth/user/login`

Exemplo de requisição

```json
{
  "email": "john@doe.com",
  "password": "123456"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "token": {
    "type": "bearer",
    "token": "Mg.B-AYtGYMkgGOTGCZCb6shoFByiKJwLzFyIWK3ozDUpBiLict34b8weWnhg05"
  }
}
```

## Estabelecimento

### Cadastrar um novo estabelecimento - `POST: /auth/tenant/register`

Exemplo de <b>Payload</b>

```json
{
  "name": "Estabelecimento de testes",
  "slug": "slug-de-testes",
  "email": "john@doe.com",
  "password": "123456"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "tenant": {
    /* ... Dados do tenant/estabelecimento ... */
  },
  "token": {
    "type": "bearer",
    "token": "Mg.B-AYtGYMkgGOTGCZCb6shoFByiKJwLzFyIWK3ozDUpBiLict34b8weWnhg05"
  }
}
```

### Login do estabelecimento - `POST: /auth/tenant/login`

Exemplo de requisição

```json
{
  "email": "john@doe.com",
  "password": "123456"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "token": {
    "type": "bearer",
    "token": "Mg.B-AYtGYMkgGOTGCZCb6shoFByiKJwLzFyIWK3ozDUpBiLict34b8weWnhg05"
  }
}
```

## Categorias

### Buscar categorias do estabelecimento - `GET: /user/categories`

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "categories": [
    {
      "name": "Categoria1",
      "tenant_id": 1,
      "id": 1
    }
  ]
}
```

### Cadastrar nova categoria - `POST: /tenant/categories`

Exemplo de requisição

```json
{
  "name": "Categoria1"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "newCategory": {
    "name": "Categoria1",
    "tenant_id": 1,
    "id": 1
  }
}
```

### Atualizar uma categoria - `PATCH: /tenant/categories/:id`

Exemplo de <b> Request </b>

```json
{
  "name": "Categoria2"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "category": {
    "name": "Categoria2",
    "tenant_id": 1,
    "id": 1
  }
}
```

### Deletar uma categoria - `DELETE: /tenant/categories/:id`

Exemplo de <b> Retorno </b>

```json
{
  "error": []
}
```

## Dados do Usuário / Estabelecimento logado `GET: /auth/check`

Exemplo de <b> Retorno </b>

```json
{
	"error": [],
	"data": { /** .. Dados do usuário ou estabelecimento logado. **/	},
	"type": "User" /** Para usuário **/ | "Tenant" /** Para estabelecimento **/
}
```

## Solicitar Token p/ Recuperar Senha `POST: /auth/forgotPassword`

Exemplo de <b> Payload</b>

```json
{
  "email": "john@doe.com"
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "message": "Email de Recuperação enviado com sucesso"
}
```

## Confirmar Token p/ Recuperar Senha `POST: /auth/resetPassword`

Exemplo de <b> Payload</b>

```json
{
	"email" : "john@doe.com",
	"password": "123456" // Nova senha
	"token": "7c7a8a89-5c6d-4c5a-a454-874ab7a8eb0a" // Token gerado e enviado por email.
}
```

Exemplo de <b> Retorno - SUCESSO </b>

```json
{
  "error": [],
  "message": "Email resetado com sucesso"
}
```

Exemplo de <b> Retorno - ERRO</b>

```json
{
  "error": [{ "mesage": "Combinação de E-mail e Token Inválidos" }]
}
```

## Endereços

### Buscar enedereços do usuário - `GET: /user/addresses`

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "addresses": [
    {
      "street": "Rua dos bobos",
      "street_number": "0",
      "district_id": 1,
      "city": "Lugar Nenhum",
      "state": "Estado algum",
      "complement": "Do lado do vizinho.",
      "user_id": 1,
      "id": 1
    }
  ]
}
```

### Cadastrar novo endereço - `POST: /user/addresses`

Exemplo de requisição

```json
{
  "street": "Rua dos bobos",
  "street_number": "0",
  "district_id": 1,
  "city": "Lugar Nenhum",
  "state": "Estado algum",
  "complement": "Do lado do vizinho."
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "newAddress": {
    "street": "Rua dos bobos",
    "street_number": "0",
    "district_id": 1,
    "city": "Lugar Nenhum",
    "state": "Estado algum",
    "complement": "Do lado do vizinho.",
    "user_id": 1,
    "id": 1
  }
}
```

### Buscar um único endereço - `GET: /user/addresses/:id`

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "address": {
    "street": "Rua dos bobos",
    "street_number": "0",
    "district_id": 1,
    "city": "Lugar Nenhum",
    "state": "Estado algum",
    "complement": "Do lado do vizinho.",
    "user_id": 1,
    "id": 1
  }
}
```

### Atualizar um endereço - `PATCH: /user/addresses/:id`

Exemplo de <b> Request </b>

```json
{
  "street": "Rua dos bobos",
  "street_number": "2",
  "district_id": 1,
  "city": "Lugar Nenhum",
  "state": "Estado algum",
  "complement": "Do lado do vizinho."
}
```

Exemplo de <b> Retorno </b>

```json
{
  "error": [],
  "address": {
    "street": "Rua dos bobos",
    "street_number": "2",
    "district_id": 1,
    "city": "Lugar Nenhum",
    "state": "Estado algum",
    "complement": "Do lado do vizinho.",
    "user_id": 1,
    "id": 1
  }
}
```

### Deletar um endereço - `DELETE: /user/addresses/:id`

Exemplo de <b> Retorno </b>

```json
{
  "error": []
}
```
