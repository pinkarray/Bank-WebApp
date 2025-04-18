include .env

app-process-id:
	docker inspect -f '{{.State.Pid}}' bank_blockchain_web_app
	
build-app:
	docker build  -t bank_blockchain_web_app . 


start-app:
	docker run -d --restart=always -p  ${APP_EXTERNAL_SERVER_PORT}:${PORT} --add-host=host.docker.internal:host-gateway --env-file .env  --name  bank_blockchain_web_app bank_blockchain_web_app   

stop-app:
	docker stop bank_blockchain_web_app || true && \
    docker rm -f bank_blockchain_web_app || true



restart-app: stop-app start-app 

restart-build-app: build-app stop-app start-app