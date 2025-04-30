$APP_NAME = "Get Xiaomi Watchface"

$host.UI.RawUI.WindowTitle = $APP_NAME

function Test-FileIntegrity {
    Write-Host "- Checking file..." -ForegroundColor White
    $missingFiles = @()
    
    if (-not (Test-Path "server.js")) { $missingFiles += "server.js" }
    if (-not (Test-Path "public")) { $missingFiles += "public Directory" }
    
    if (Test-Path "public") {
        if (-not (Test-Path "public\index.html")) { $missingFiles += "public\index.html" }
        if (-not (Test-Path "public\styles")) { $missingFiles += "public\styles Directory" }
        if (-not (Test-Path "public\styles\main.css")) { $missingFiles += "public\styles\main.css" }
        if (-not (Test-Path "public\styles\fonts")) { $missingFiles += "public\styles\fonts Directory" }
    }
    
    if ($missingFiles.Count -gt 0) {
        Write-Host "`n! Error: The following necessary files are missing orDirectory:" -ForegroundColor Red
        foreach ($file in $missingFiles) {
            Write-Host "- $file" -ForegroundColor Red
        }
        Write-Host "`n- Please ensure that the program package has been completely decompressed, or download it again." -ForegroundColor Yellow
        Write-Host "  Download at here: github.com/useless-anlong/get-mi-watchface/releases/" -ForegroundColor Yellow
        return $false
    }
    
    Write-Host "+ File check passed!" -ForegroundColor Green
    Write-Host ""
    return $true
}

function Test-NodeJS {
    Write-Host "- Checking the Node.js installation..." -ForegroundColor White
    
    try {
        $nodeVersion = node -v
        Write-Host "+ Installed Node.js: $nodeVersion" -ForegroundColor Green
        Write-Host ""
        return $true
    } 
    catch {
        Write-Host "! Node.js was not detected. Node.js needs to be installed to continue." -ForegroundColor Red
        
        $installChoice = Read-Host "Do you need us to help you install Node.js?(Y/N)"
        if ($installChoice -eq 'Y' -or $installChoice -eq 'y') {
            try {
                Write-Host "- The Node.js installer is being downloaded..." -ForegroundColor Cyan
                $tempFile = [System.IO.Path]::GetTempFileName() + '.msi'
                Invoke-WebRequest -Uri 'https://nodejs.org/dist/v22.15.0/node-v22.15.0-x64.msi' -OutFile $tempFile
                
                Write-Host "- Node.js is being installed. Please wait..." -ForegroundColor Cyan
                Start-Process -FilePath 'msiexec.exe' -ArgumentList "/i `"$tempFile`" /quiet /norestart" -Wait
                
                # ��鰲װ�Ƿ�ɹ�
                try {
                    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
                    $nodeVersion = node -v
                    Write-Host "+ Node.js is installed successfully: $nodeVersion" -ForegroundColor Green
                    return $true
                } 
                catch {
                    Write-Host "! Node.js installation failed. Please install it manually." -ForegroundColor Red
                    Write-Host "  Visit https://nodejs.org/ to download and install Node.js." -ForegroundColor Red
                    return $false
                }
            }
            catch {
                Write-Host "! An error occurred while downloading or installing Node.js:$_" -ForegroundColor Red
                Write-Host "  Please install Node.js manually." -ForegroundColor Yellow
                Write-Host "  Visit https://nodejs.org/ to download and install Node.js." -ForegroundColor Yellow
                return $false
            }
        } 
        else {
            Write-Host "! Please install Node.js manually before running this script." -ForegroundColor Yellow
            Write-Host "  Visit https://nodejs.org/ to download and install Node.js." -ForegroundColor Yellow
            return $false
        }
    }
}

function Test-Dependencies {
    Write-Host "- Checking for dependent packages..." -ForegroundColor White
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "! The node_modules Directory was not found. Dependency packages need to be installed." -ForegroundColor Red
        
        $installChoice = Read-Host "? Should the dependency packages be installed now? (Y/N)"
        if ($installChoice -eq 'Y' -or $installChoice -eq 'y') {
            Write-Host "- The dependency packages are being installed. Please wait..." -ForegroundColor Cyan
            
            try {
                npm install
                if ($LASTEXITCODE -ne 0) { throw "! NPM installation failed" }
                
                Write-Host "+ The dependent packages have been installed." -ForegroundColor Green
                return $true
            } 
            catch {
                Write-Host "! Failed to install dependency packages: $_" -ForegroundColor Red
                Write-Host "  Please check the network connection or manually execute npm install." -ForegroundColor Yellow
                return $false
            }
        } 
        else {
            Write-Host "! The installation of dependent packages has been cancelled, and the script cannot continue." -ForegroundColor Red
            return $false
        }
    }
    
    Write-Host "+ The dependency packages check have passed!" -ForegroundColor Green
    Write-Host ""
    return $true
}
function Start-NodeServer {
    Write-Host "Welcome!" -ForegroundColor DarkGray
    Write-Host "====================================================" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "You can now execute node server.js to start the program!"
    Write-Host "Press any key to exit..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

    # Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    # Start-Process "http://localhost:$NODE_PORT"
    # node server.js
}

Clear-Host
Write-Host "$APP_NAME was initializing..." -ForegroundColor DarkGray
Write-Host "====================================================" -ForegroundColor DarkGray
Write-Host ""

$fileCheck = Test-FileIntegrity
if (-not $fileCheck) {
    Write-Host ""
    Write-Host "- Press any key to exit..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

$nodeCheck = Test-NodeJS
if (-not $nodeCheck) {
    Write-Host ""
    Write-Host "- Press any key to exit..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

$dependencyCheck = Test-Dependencies
if (-not $dependencyCheck) {
    Write-Host ""
    Write-Host "- Press any key to exit..." -ForegroundColor DarkGray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Start-NodeServer