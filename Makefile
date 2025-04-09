.PHONY: backend/migrate
backend/migrate:
	@docker exec cabinfy-backend npx prisma migrate deploy

.PHONY: backend/seed
backend/seed:
	@docker exec cabinfy-backend npx prisma db seed

.PHONY: frontend/build
frontend/build:
	@cd frontend && npm run build && cd ..

.PHONY: frontend/send
frontend/send:
	@cd frontend && rsync -rP dist nicolas@106.14.126.186:~/petify/react-build-frontend && cd ..

.PHONY: dashboard/build
dashboard/build:
	@cd dashboard && npm run build && cd ..

.PHONY: dashboard/send
dashboard/send:
	@cd dashboard && rsync -rP dist nicolas@106.14.126.186:~/petify/react-build-dashboard && cd ..
