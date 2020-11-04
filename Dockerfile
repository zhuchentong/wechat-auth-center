# 编译阶段
FROM node:lts-alpine as builder

ADD . /builder/

WORKDIR /builder

RUN yarn config set registry http://192.168.0.10:8081/repository/npm-proxy \
  && yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass \
  && yarn \
  && npm run build \
  && rm -rf src test

# 运行阶段
FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /builder/dist/ /usr/share/nginx/html/

EXPOSE 80

