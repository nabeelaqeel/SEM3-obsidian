
> tak lengkap lagi . kene buat open port dengan openvpn kene buat dl
1. Using Google Cloud : Cloud Computing Services

- Open up cloud terminal 
```
gclound init
```

```
gcloud compute instances create gns33 \
  --enable-nested-virtualization \
  --zone=us-central1-c \
  --min-cpu-platform="Intel Haswell" \
  --image=ubuntu-2404-noble-amd64-v20241115 \
  --image-project=ubuntu-os-cloud

```

```
gcloud compute instances create gns3 \
  --enable-nested-virtualization \
  --zone=us-central1-c \
  --machine-type=n2-standard-4 \
  --image=ubuntu-2404-noble-amd64-v20241115 \
  --image-project=ubuntu-os-cloud
```
- [Reference](https://cloud.google.com/compute/docs/instances/nested-virtualization/enabling https://console.cloud.google.com/)
- Refresh and there will be a new instance vm 

3. ssh to the vm . Click SSH under the Connect 

4. Update the apt package
```
sudo apt update && sudo apt upgrade
```

5. Paste the code from gns website
```
cd /tmp
curl https://raw.githubusercontent.com/GNS3/gns3-server/master/scripts/remote-install.sh > gns3-remote-install.sh
sudo bash gns3-remote-install.sh --with-openvpn --with-iou --with-i386-repository
```

- Reference : https://docs.gns3.com/docs/getting-started/installation/remote-server/

4. Go to GNS3 >edit > preference >  server > remote server 
- add our host and name
- but i get an error
```
=> GNS3 controller version 2.2.49 is not the same as compute server version 2.2.51
```
This error is because the gns3 on my pc is using 2.2.49 while the gns3-server that we just download is using 2.2.51 version. To fix this error we going to downgrade our gns3-server that we just download.

5. Install gns3-server the right version

- Find your gns3-server version on [github releases](https://github.com/GNS3/gns3-server/releases)
- click on the right version , as for me it will to this url : https://github.com/GNS3/gns3-server/releases/tag/v2.2.49
- right-click Source code(zip) and click `Copy link address`
- On server 
```
cd /home/nabeelaqeel67
wget <zip_file>
sudo apt install unzip
unzip <file>
cd gns3-server-2.2.49/

sudo apt install python3-virtualenv python3 python3-pip python3-setuptools python3-dev git apt install python3.12-venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install setuptools
python3 setup.py install


```

```
wget <zip_file>
cd gns-server-<version>

sudo apt update
sudo apt install python3 python3-pip python3-setuptools python3-dev git

sudo pip3 install virtualenv

pip3 install -r requirements.txt
python3 setup.py install

gns3server --version
```

- Kill current gns3-process
	- check the running process
	```
	ps aux | grep gns
	```
	
```console
nabeela+    1474  0.2  1.3 207216 52132 pts/0    S+   01:46   0:04 /usr/bin/python3 /usr/local/bin/gns3server
nabeela+    1738  0.0  0.0   8168   720 pts/1    S+   02:15   0:00 grep --color=auto gns```
```

```
sudo kill -9 1474 
```
	- recheck the running proces if the running process is still there try this command

```
sudo systemctl stop gns3
sudo systemctl disable gns3
```

6. Run gns3server
```
gns3server
```

7. set it up as a systemd service for easier management:
- Create a systemd service file:
```
sudo nano /etc/systemd/system/gns3.service
```

add 
```
[Unit]
Description=GNS3 Server
After=network.target

[Service]
User=<your-username>
ExecStart=/usr/local/bin/gns3server
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```
> Note : make user has permission can run gns3server . To make it easier you can use root

- in ExecStart you can check where is the location by running `which gns3server`


- reload systemd and start the service
```
sudo systemctl daemon-reload
sudo systemctl start gns3
sudo systemctl enable gns3

```
- Verification
```
systemctl status gns3
```

```
cd /home/nabeelaqeel67/gns3-server-2.2.49
source venv/bin/activate
```
## Restart 
sudo systemctl restart gns3

## Enable KVM
- https://cloud.google.com/compute/docs/instances/nested-virtualization/enabling#gcloud
- The external ip might change so , change openvpn and the other instruction with new ip
### When reopen
- Connect to OpenVPN 1st

## Problem 
- Afer setup you might have to stop and start the vm back 
- Error while creating link: Cannot get an IP address on same subnet: No common subnet for compute Aqeel and server
	- go to Edit>Preference>Server>Host binding 
	- choose your vpn ip

```
source /path/to/my-venv/bin/activate

```