# <p align = "center"> Projeto Bookers Club </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Matheus Amorim-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/mtsgamorim/Bookers-Club-Back-End?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

Bookers Club é uma aplicação onde cada usúario pode ter um histórico de todos os livros que já leu, encontrar qualquer livro e ler reviews de outros usúarios para poder decidir qual será a sua próxima leitura

---

## :computer: Tecnologias e Conceitos

- Typescript
- Postgres with Prisma
- Jest and Supertest
- Express

---

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "name": "Lorem ipsum",
        "email": "lorem@gmail.com",
        "image": "https://lorem.com"
        "password": "loremipsum"
}
```

```yml
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

```yml
Post /book (autenticada)
    - Rota para criar um livro ja lido
    - headers: { "Authorization": "Bearer $token" }
    - body: {
                "bookId": "FDSDFAF",
                "title": "livro"
            }
```

```yml
GET /book (autenticada)
    - Rota para listar livros do usuario
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /book/:id (autenticada)
    - Rota para visualizar livro especifico do usuario (id é o bookId)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
PATCH /book/:id (autenticada)
    - Rota para adicionar review em um livro
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        review: "sua review"
    }
```

```yml
DELETE /book/:id (autenticada)
    - Rota para remover livro lido
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /reviews (autenticada)
    - Rota para ver os reviews de outros úsuarios
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/mtsgamorim/Bookers-Club-Back-End
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```

:stop_sign: Não esqueça de visualizar o front-end dessa aplicação: [repositório](https://github.com/mtsgamorim/Bookers-Club-Front-End) que contem a interface da aplicação, para testar o projeto por completo.
