

pipeline {
    agent any

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
                echo 'Installing pnpm..'

                sh 'curl -fsSL https://get.pnpm.io/install.sh | sh'
                sh 'export PATH="$HOME/.pnpm/bin:$PATH"'
            }
        }

        stage('Lint') {
            steps {
                echo 'Checking lint..'
                sh 'pnpm lint'
            }
        }

        stage('install packages') {
            steps {
                echo 'Installing packages..'
                sh 'pnpm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests..'
                sh 'pnpm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                sh 'pnpm build'
            }
        }

        stage('Build image') {
            steps {
                echo 'Building image..'
                sh 'docker build -t next-ps-assignment@latest .'
            }
        }

        stage('verify Vercel CLI') {
            steps {
                sh 'pnpm i -g vercel@latest'
                sh 'vercel --version'
            }
        }

        stage('pull') {
            steps {
                sh 'vercel --cwd $WORK_DIR --no-color --token $VERCEL_TOKEN pull --yes'
            }
        }

        stage('build') {
            steps {
                sh 'vercel --cwd $WORK_DIR --no-color --token $VERCEL_TOKEN build --prod --yes'
            }
        }

        stage('deploy function') {
            steps {
                sh 'vercel --cwd $WORK_DIR --no-color --token $VERCEL_TOKEN deploy --prebuilt --prod'
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