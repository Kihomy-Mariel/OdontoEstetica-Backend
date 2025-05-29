FROM node:20-alpine

WORKDIR /app

# Configurar npm para mejor rendimiento
RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retries 5

# Instalar dependencias incluyendo las de desarrollo
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Instalar NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Limpiar dependencias de desarrollo
RUN npm prune --production

# Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer el puerto
EXPOSE ${PORT}

# Ejecutar la aplicación
CMD ["node", "dist/main"]