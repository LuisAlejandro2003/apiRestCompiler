# Dockerfile

# Utiliza una imagen base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 5000

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
