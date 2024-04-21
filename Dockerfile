# Use a imagem oficial do SQLite
FROM alpine:latest

# Copie o arquivo do banco de dados para dentro do contêiner
COPY database.db var/lib/database.db

# Instale o SQLite3
RUN apk add --no-cache sqlite

# Defina a senha do SQLite
ENV SQLITE_PASSWORD 123

# Exponha a porta em que o SQLite será acessado
EXPOSE 8001

# Comando para iniciar o SQLite
CMD ["tail", "-f", "/dev/null"]