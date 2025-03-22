# Usa a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências para dentro do container
COPY package*.json ./
COPY yarn.lock ./

# Instala as dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código do projeto
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["yarn", "start"]