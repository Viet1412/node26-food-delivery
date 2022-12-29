#build image dựa trên image của node
FROM node:18-alpine

#Tạo 1 directory bên trong image để chứa code của ứng dụng 
WORKDIR /app

#Copy toàn bộ code của ứng dụng vào bên trong working directory (folder app)
COPY . .

# Thực thi một câu lệnh bên trong working directory
RUN npm install

# Chop phép quyền thực thi
RUN chmod +x wait-for

EXPOSE 4000

CMD ["node", "src/index.js"]

