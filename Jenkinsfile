pipeline {
  agent any

  environment {
    SONARQUBE_SERVER = 'sonarqube-local'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci || npm install'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          def scannerHome = tool 'sonar-tool'
          withSonarQubeEnv("${SONARQUBE_SERVER}") {
            sh """
              "${scannerHome}/bin/sonar-scanner" \
                -Dsonar.projectKey=${env.JOB_NAME} \
                -Dsonar.sources=.
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }

  post {
    success {
      echo 'Pipeline completado correctamente.'
    }
    failure {
      echo 'Pipeline fallido. Revisar logs del análisis de SonarQube.'
    }
  }
}
