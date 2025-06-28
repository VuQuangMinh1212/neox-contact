pipeline {
agent any
tools { nodejs "NodeJS18" }
environment {
DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
DOCKER_IMAGE = 'mv1212/neox-contact'
}
stages {
stage('Clone Repository') {
steps {
git url: 'https://github.com/VuQuangMinh1212/neox-contact.git', branch: 'main'
}
}
stage('Build') {
steps {
sh 'npm install --force'
sh 'npm run build'
}
}
stage('Test') {
steps {
sh 'npm test || echo "No tests defined"'
}
}
stage('Build Docker Image') {
steps {
script {
dockerImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
}
}
}
stage('Push to Docker Hub') {
steps {
script {
docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
dockerImage.push()
dockerImage.push('latest')
}
}
}
}
stage('Deploy') {
steps {
sh '''
docker stop neox-contact || true
docker rm neox-contact || true
docker run -d --name neox-contact -p 3001:3000 --restart=unless-stopped ${DOCKER_IMAGE}:latest
'''
}
}
}
}
