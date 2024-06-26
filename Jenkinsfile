

pipeline {
     agent {
        any {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }

    environment {
        VERCEL_TOKEN=credentials('vercel-token')
        VERCEL_SCOPE='Sudhanva Nadiger\'s projects'
        WORK_DIR='next-ps-assignment'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code..'
                checkout scm
            }
        }

        stage('Install pnpm...') {
            steps {
                echo 'Installing pnpm'
                bat 'corepack enable'
                bat 'corepack prepare pnpm@latest-9 --activate'
            }
        }

        stage('install packages') {
            steps {
                echo 'Installing packages..'
                bat 'pnpm install'
            }
        }

        stage('Lint') {
            steps {
                echo 'Checking lint..'
                bat 'pnpm lint'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests..'
                bat 'pnpm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                bat 'pnpm build'
            }
        }

        stage('Build image') {
            steps {
                echo 'Building image..'
                bat 'docker build -t assignment:latest .'
            }
        }
    }
    
    post {
        cleanup {
            echo 'Cleaning up..'
            cleanWs()
        }

        success {
            echo 'Build and deployment successful! 🎉'
        }

        failure {
            echo '⚠ Build or deployment failed!'
        }

        always {
            echo 'Pipeline finished..'
        }

    }
}