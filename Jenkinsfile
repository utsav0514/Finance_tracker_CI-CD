pipeline {
    agent { label 'slave_one' }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from git..."
                checkout scm
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                    echo "Building the Docker image of Backend..."
                    whoami
                    docker build -t backend:$BUILD_NUMBER ./server
                '''
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                    echo "Building frontend Docker image..."
                    whoami
                    docker build -t frontend:$BUILD_NUMBER ./client
                '''
            }
        }

        stage('Scan Images with Trivy') {
            steps {
                sh '''
                    trivy image -f json -o backend-report.json backend:$BUILD_NUMBER
                    trivy image -f json -o frontend-report.json frontend:$BUILD_NUMBER
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'
                withDockerRegistry([credentialsId: 'docker-id', url: '']) {
                    sh '''
                        docker tag frontend:$BUILD_NUMBER utsav0514/frontend:$BUILD_NUMBER
                        docker push utsav0514/frontend:$BUILD_NUMBER
                        docker tag backend:$BUILD_NUMBER utsav0514/backend:$BUILD_NUMBER
                        docker push utsav0514/backend:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Deploy Containers') {
		environment {
        PATH = "/usr/bin:/usr/local/bin:/home/vagrant/.docker/cli-plugins:$PATH"
    }
            steps {
                echo "Deploying containers using Docker Compose..."
                sh '''
                    docker compose down
                    docker compose up -d
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up dangling images...'
            sh 'docker image prune -f'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

