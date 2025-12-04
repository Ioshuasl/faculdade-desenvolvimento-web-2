├── node_modules/
├── src/
│   ├── @types/          <-- Para tipagens personalizadas (ex: req.userId)
│   ├── config/          <-- Configuração do DB e Multer
│   ├── controllers/     <-- Lógica das rotas
│   ├── database/        <-- Conexão e Models
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── models/
│   ├── middlewares/     <-- Auth, Validações
│   ├── routes/          <-- Definição de rotas
│   ├── services/        <-- (Opcional) Lógica de negócio pesada e paginação
│   ├── utils/           <-- Funções auxiliares
│   ├── validators/      <-- Express-validator schemas
│   ├── app.ts           <-- Configuração do Express
│   └── server.ts        <-- Entry point (sobe o servidor)
├── .env
├── .gitignore
├── package.json
└── tsconfig.json

docker-compose up -d

npm start