.PHONY: help build dev prod clean deploy logs

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

build: ## Build Docker images
	echo "🛠️  Starting build environment..."
	docker compose build
	echo "✅ Build done"

dev: ## Start development server
	echo "🛠️  Starting development environment..."
	docker compose --profile dev up coffpro-dev


prod: ## Start production server
	docker compose up -d coffpro-app

stop: ## Stop all containers
	docker compose down

clean: ## Clean Docker images and containers
	docker compose down --rmi all --volumes --remove-orphans
	docker system prune -af

logs: ## Show production logs
	docker compose logs -f coffpro-app

shell: ## Access container shell
	docker compose exec coffpro-app sh
