pipeline {
  agent any

  environment {
    IMAGE_NAME = '7665072317/ammazon-df'
    KUBE_CONFIG = credentials('kubeconfig-id') // Jenkins secret for kubeconfig
  }

  stages {
    stage('Clone Repo') {
      steps {
        git credentialsId: 'github-token', url: 'https://github.com/Mohit12345789/ammazon-df.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $IMAGE_NAME:${BUILD_NUMBER} ."
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME:${BUILD_NUMBER}
          """
        }
      }
    }

    stage('Deploy to EKS') {
  steps {
    withCredentials([file(credentialsId: 'kubeconfig-id', variable: 'KUBECONFIG')]) {
      sh """
        kubectl apply -f deployment.yaml
        kubectl set image deployment/nodejs-deployment nodejs-container=7665072317/ammazon-df:${BUILD_NUMBER}
        kubectl apply -f ingress.yaml
      """
    }
  }
}
  }
}


