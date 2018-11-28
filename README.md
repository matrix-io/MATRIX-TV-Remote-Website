# Overview
Use your Raspberry Pi & MATRIX Creator to setup a website to control your TV.

# Setup
All setup steps will be done on your Raspberry Pi.
## 1. Install IR Dependencies

The following steps from 
[MATRIX Creator IR Test](https://github.com/matrix-io/matrix-creator-ir-test)
 must be completed.

 - Step 1: [Installing the MATRIX Dependencies](https://github.com/matrix-io/matrix-creator-ir-test#1-installing-the-matrix-dependencies)
 
 - Step 2: [Installing pigpio](https://github.com/matrix-io/matrix-creator-ir-test#2-installing-pigpio)

 Before continuing, pigpio must be running to allow IR functionality.
```
sudo pigpiod
```

## 2. Download Project
Install git.
```bash
sudo apt-get install git
```
Download this repository to your home directory.
```bash
git clone https://github.com/matrix-io/MATRIX-TV-Remote-Website ~/tv_remote
```

## 3. Install Node.js & Packages
Install Node.js.
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install 8.6
```
Move into the project folder and download the required packages.
```bash
cd ~/tv_remote
npm install
```

## 4. Record Your TV Commands
Run the shell script inside `tv_commands` to record buttons from your TV remote. 

**Begin pressing the prompted buttons on your TV remote**. The commands created are made to best match an average remote.

```
cd ~/tv_remote/tv_commands
chmod +x ./recordCommands.sh
./recordCommands.sh
```

## 5. Launch TV Remote Website
Run this project
```shell
cd ~/tv_remote
node ~/tv_remote/app.js
```

Go into a web browser and enter the followig URL:

`YOUR_RASPBERRY_PI_IP:8080`

# Additonal Notes
## Starting On Boot
Add the following commands to `etc/rc.local`, for your Pi to start with the TV remote website running.'
> make sure the commands below are **inserted above `exit 0`** in `rc.local`
```
# Start pigpio
sudo pigpiod
# Start TV remote website
/home/pi/.nvm/versions/node/v8.6.0/bin/node /home/pi/tv_remote/app.js &
```

## Adding Custom TV Commands
In order to add custom commands, the command must be inside `tv_remote/tv_commands/codes.json`

A new command can be created by using:
```shell
# Command
python ~/tv_remote/tv_commands/ir_remote.py -r -g16 -f codes.json PUT_COMMAND_NAME_WITH_NO_SPACES_HERE

# Example
python ~/tv_remote/tv_commands/ir_remote.py -r -g16 -f codes.json volume_up
```

With your new command set, the [TV remote website files](https://github.com/matrix-io/MATRIX-TV-Remote-Website/tree/master/public) can be edited to change or add your command. Some knowledge of HTML and Javascript will be required.


## 


