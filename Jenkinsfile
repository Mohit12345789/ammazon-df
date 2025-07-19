pipeline {
  agent any

  environment {
    IMAGE_NAME = '7665072317/ammazon-df'
    KUBE_CONFIG = credentials('kubeconfig-id') // Jenkins secret for kubeconfig
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/Mohit12345789/amazon-df.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $ammazon:${BUILD_NUMBER} ."
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $ammazon:${BUILD_NUMBER}
          """
        }
      }
    }

    stage('Deploy to EKS') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-id', variable: 'KUBECONFIG')]) {
          sh """
            kubectl set image deployment/nodejs-deployment nodejs-container=$ammazon:${BUILD_NUMBER}
            kubectl apply -f ingress.yaml
          """
        }
      }
    }
  }
}
