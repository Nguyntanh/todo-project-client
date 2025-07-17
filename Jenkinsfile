pipeline {
    agent any

    stages {
        stage('clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Nguyntanh/todo-project-client.git'
            }
        }

        stage('restore package') {
            steps {
                echo 'Installing dependencies'
                bat 'npm install' // Use 'yarn install' if you prefer Yarn
            }
        }

        stage('build') {
            steps {
                echo 'Building ReactJS project'
                bat 'npm run build' // Use 'yarn build' if you prefer Yarn
            }
        }

        stage('tests') {
            steps {
                echo 'Running tests...'
                bat 'npm test -- --passWithNoTests' // Use '--passWithNoTests' to avoid errors if no tests are defined
            }
        }

        stage('publish den thu muc') {
            steps {
                echo 'Publishing build output...'
                bat 'mkdir publish || exit 0' // Create publish directory if it doesn't exist
                bat 'xcopy "%WORKSPACE%\\build" /E /Y /I /R "%WORKSPACE%\\publish"' // Copy React's build folder to publish
            }
        }

        stage('Publish') {
            steps {
                echo 'Copying to IIS wwwroot folder'
                // bat 'iisreset /stop' // Uncomment if you need to stop IIS
                bat 'xcopy "%WORKSPACE%\\publish" /E /Y /I /R "c:\\wwwroot\\myproject"'
            }
        }

        stage('Deploy to IIS') {
            steps {
                echo 'Configuring IIS website'
                powershell '''
                    Import-Module WebAdministration
                    $siteName = "MySite"
                    if (-not (Test-Path IIS:\\Sites\\$siteName)) {
                        New-Website -Name $siteName -Port 81 -PhysicalPath "c:\\wwwroot\\myproject"
                    }
                    # Configure URL rewrite for React client-side routing
                    $ruleName = "ReactRouter"
                    $ruleExists = Get-WebConfiguration -Filter "/system.webServer/rewrite/rules/rule[@name='$ruleName']" -PSPath "IIS:\\Sites\\$siteName"
                    if (-not $ruleExists) {
                        Add-WebConfiguration -Filter "/system.webServer/rewrite/rules" -PSPath "IIS:\\Sites\\$siteName" -Value @{
                            name = $ruleName
                            patternSyntax = "Regular Expressions"
                            stopProcessing = "true"
                        }
                        Add-WebConfiguration -Filter "/system.webServer/rewrite/rules/rule[@name='$ruleName']/match" -PSPath "IIS:\\Sites\\$siteName" -Value @{
                            url = ".*"
                        }
                        Add-WebConfiguration -Filter "/system.webServer/rewrite/rules/rule[@name='$ruleName']/action" -PSPath "IIS:\\Sites\\$siteName" -Value @{
                            type = "Rewrite"
                            url = "/index.html"
                        }
                    }
                '''
            }
        }
    }
}