# Sistema de Controle de Gastos Residenciais

## Instruções para rodar o projeto:

```bash

# 1. Clonar o repositório:
git clone https://github.com/heitor-nb/controle-gastos.git

# 2. Criar o arquivo .env do backend a partir do .env.example:
cd controle-gastos/WebApi
cp .env.example .env
# Copy-Item -Path ".env.example" -Destination ".env" (PowerShell)

# 3. Subir o backend + db com Docker:
sudo docker compose up -d

# 4. Criar o arquivo .env do frontend a partir do .env.example:
cd ../front
cp .env.example .env

# 5. Iniciar o servidor de desenvolvimento do Vite (que vai servir o frontend):
npm run dev 

# 6. ctrl + click na url disponibilizada

```

Se algo der errado, estou à disposição para ajudar.
Mande um email para heitor.nb10@gmail.com

## Backend

O backend foi desenvolvido seguindo a Clean Architecture e usando o padrão Mediator.

Esse design pattern permite centralizar as dependências dos controllers em um único objeto (o mediator), que, por sua vez, encaminha os requests para seus respectivos handlers.

Desse modo, os controllers ficam limpos e a orquestração entre lógica de negócios e infraestrutura fica a cargo da camada de Application.

O banco de dados escolhido foi o Postgres e a interação com ele é feita por meio do Entity Framework Core.

## Frontend

O frontend foi produzido com Vite (preset React + TypeScript).
Os componentes foram estilizados dentro do próprio código ```.tsx``` por meio da biblioteca styled-components.
