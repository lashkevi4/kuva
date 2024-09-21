# Переменные
$groupName = "GateUsers"
$outputFile = "$env:USERPROFILE\Desktop\user.txt"
$passwordLength = 16
$clientFolder = "$env:USERPROFILE\GateBot\CLIENT"
$desktopPath = "$env:USERPROFILE\Desktop"
$settingsFilePath = "$env:USERPROFILE\GateBot\SRV\settings.csv"

# Функция для очистки экрана
Clear-Host

function Center-Text {
    param (
        [string]$text
    )
    $width = [System.Console]::WindowWidth
    $textLength = $text.Length
    $padding = ($width - $textLength) / 2
    return " " * [Math]::Max([Math]::Floor($padding), 0) + $text
}

function Get-CenteredInput {
    param (
        [string]$prompt
    )
    $centeredPrompt = Center-Text $prompt
    Write-Host "`n$centeredPrompt"
    Write-Host (Center-Text "> ") -NoNewline
    return Read-Host
}

# Функция для чтения и записи файла settings.csv без кавычек
function Update-SettingsFile {
    param (
        [string]$userName,
        [string]$action # "add" для добавления, "remove" для удаления
    )
    # Чтение содержимого settings.csv
    $settings = Import-Csv $settingsFilePath

    if ($action -eq "add") {
        # Проверка на наличие пользователя в списке
        if (-not ($settings.valid_ids -contains $userName)) {
            # Добавление пользователя
            $settings += [PSCustomObject]@{valid_ids = $userName}
            Write-Host "`n" (Center-Text "Пользователь $userName добавлен в settings.csv.") "`n"
        }
    } elseif ($action -eq "remove") {
        # Удаление пользователя
        if ($settings.valid_ids -contains $userName) {
            $settings = $settings | Where-Object { $_.valid_ids -ne $userName }
            Write-Host "`n" (Center-Text "Пользователь $userName удален из settings.csv.") "`n"
        } else {
            Write-Host "`n" (Center-Text "Пользователь $userName не найден в settings.csv.") "`n"
        }
    }

    # Запись в CSV построчно
    $output = @("valid_ids")
    foreach ($entry in $settings) {
        $output += $entry.valid_ids
    }
    # Объединяем строки с помощью символа новой строки
    $outputString = $output -join "`n"
    Set-Content -Path $settingsFilePath -Value $outputString -NoNewline

    Write-Host "`n" (Center-Text "Файл settings.csv обновлен.") "`n"
}


# Главное меню
function Show-Menu {
    Clear-Host
    Write-Host ""
    Write-Host (Center-Text "Главное меню")
    Write-Host ""  # Дополнительная пустая строка
    Write-Host (Center-Text "1 - Добавить пользователя")
    Write-Host ""
    Write-Host (Center-Text "2 - Удалить пользователя")
    Write-Host ""
    Write-Host (Center-Text "3 - Список пользователей")
    Write-Host ""
    Write-Host (Center-Text "4 - Выход")
    Write-Host ""
}

# Раздел 1: Добавление пользователя
function Create-User {
    Clear-Host
    Write-Host ""
    Write-Host (Center-Text "Добавление пользователя")
    Write-Host ""

    # 1.1 Введите имя пользователя
    $userName = Get-CenteredInput "Введите имя пользователя"
    Write-Host "" # Пустая строка

    # 1.2 Проверка существования пользователя
    if (Get-LocalUser -Name $userName -ErrorAction SilentlyContinue) {
        Write-Host "`n" (Center-Text "Пользователь $userName уже существует.") "`n"
    } else {
        # Генерация пароля
        function Generate-RandomPassword {
            param (
                [int]$length = 16
            )
            $chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*()"
            $password = -join ((1..$length) | ForEach-Object { Get-Random -Maximum $chars.Length | ForEach-Object { $chars[$_]} })
            return $password
        }
        $password = Generate-RandomPassword -length $passwordLength
        $securePassword = ConvertTo-SecureString -String $password -AsPlainText -Force

        # 1.2 Добавление пользователя
        New-LocalUser -Name $userName -Password $securePassword -AccountNeverExpires:$false -UserMayNotChangePassword:$true -PasswordNeverExpires:$true | Out-Null
        Write-Host "`n" (Center-Text "Пользователь $userName создан.") "`n"

        # 1.3 Добавление в группу GateUsers
        Add-LocalGroupMember -Group $groupName -Member $userName | Out-Null
        Write-Host "`n" (Center-Text "Пользователь $userName добавлен в группу $groupName.") "`n"

        # 1.4 Внесение в файл
        "`n$userName - $password" | Out-File -FilePath $outputFile -Append -Encoding UTF8
        Write-Host "`n" (Center-Text "Информация о пользователе записана в файл $outputFile.") "`n"

        # 1.5 Обновление файла settings.csv
        Update-SettingsFile -userName $userName -action "add"

        # 1.6 Изменение файла config.ini
        $configFilePath = Join-Path $clientFolder "config.ini"
        $configContent = "[DEFAULT]`ncomputer_id = $userName"
        Set-Content -Path $configFilePath -Value $configContent
        Write-Host "`n" (Center-Text "Файл config.ini обновлен.") "`n"

        # 1.7 Архивирование файлов
        $archiveName = "$userName.zip"
        $archivePath = Join-Path $desktopPath $archiveName

        $tempFolder = Join-Path $clientFolder $userName
        New-Item -Path $tempFolder -ItemType Directory -Force | Out-Null
        Copy-Item -Path (Join-Path $clientFolder "client.exe"), (Join-Path $clientFolder "config.ini"), (Join-Path $clientFolder "dynam.cer"), (Join-Path $clientFolder "server.rdp") -Destination $tempFolder

        Compress-Archive -Path $tempFolder\* -DestinationPath $archivePath -Force
        Remove-Item -Path $tempFolder -Recurse -Force

        Write-Host "`n" (Center-Text "Архив $archiveName создан и сохранен на рабочем столе.") "`n"
    }

    Pause
}

# Раздел 2: Удаление пользователя
function Remove-User {
    Clear-Host
    Write-Host ""
    Write-Host (Center-Text "Удаление пользователя")
    Write-Host ""

    # 2.1 Запрос имени пользователя для удаления
    $userName = Get-CenteredInput "Введите имя пользователя для удаления"
    Write-Host "" # Пустая строка

    # 2.2 Удаление пользователя
    if (Get-LocalUser -Name $userName -ErrorAction SilentlyContinue) {
        Remove-LocalUser -Name $userName
        Write-Host "`n" (Center-Text "Пользователь $userName удален.") "`n"

        # Удаление пользователя из settings.csv
        Update-SettingsFile -userName $userName -action "remove"
    } else {
        Write-Host "`n" (Center-Text "Пользователь $userName не найден.") "`n"
    }

    Pause
}

# Раздел 3: Список пользователей
function List-Users {
    Clear-Host
    Write-Host ""
    Write-Host (Center-Text "Список всех пользователей")
    Write-Host ""
    $users = Get-LocalUser
    $users | ForEach-Object {
        Write-Host (Center-Text $_.Name)
    }
    Write-Host ""
    Write-Output (Center-Text "Вывод списка пользователей завершен")
    Pause
}

# Пауза
function Pause {
    Write-Host ""
    Write-Host (Center-Text "Нажмите любую клавишу для продолжения...")
    [void][System.Console]::ReadKey($true)
}

# Главный цикл
while ($true) {
    Show-Menu
    $choice = Get-CenteredInput "Выберите действие"
    switch ($choice) {
        1 { Create-User }
        2 { Remove-User }
        3 { List-Users }
        4 { exit }
        default {
            Write-Host "`n" (Center-Text "Неверный выбор. Пожалуйста, выберите 1, 2, 3 или 4.") "`n"
            Pause
        }
    }
}
