FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de la aplicación
COPY . . 

# Exponer el puerto en el que correrá la aplicación
EXPOSE 5000 

# Comando para correr la aplicación
CMD ["python", "app.py"]