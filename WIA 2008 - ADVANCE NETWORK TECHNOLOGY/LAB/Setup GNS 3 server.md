
1. Using Google Cloud : Cloud Computing Services

- Open up cloud terminal 
```
gclound init
```

```
gcloud compute instances create gns3 \
  --enable-nested-virtualization \
  --zone=us-central1-c \
  --min-cpu-platform="Intel Haswell" \
  --image=ubuntu-2404-noble-amd64-v20241115 \
  --image-project=ubuntu-os-cloud

```

- [Reference](https://cloud.google.com/compute/docs/instances/nested-virtualization/enabling https://console.cloud.google.com/)
- Refresh and there will be a new instance vm 
2. `Click` 3 dot beside the SSH button > View network details > Firewall > CREATE FIREWALL RULE > 

	- Target : All instances in the network 
	- Source IPv4 ranges : 0.0.0.0/0
	- Protocol and port > specified protocol and ports  : 
		- TCP : 8003 , 80
		- UDP : 1194

	`Click` CREATE

3. On the VM instance page . `SSH`  to the gns3 VM . `Click` SSH under the Connect 

4. On the machine . Update the apt package
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

6. After installing all of that 

<details>
<summary>Click here to view the machine state</summary>

Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-1018-gcp x86_64)<br><br>

 * Documentation:  https://help.ubuntu.com<br>
 * Management:     https://landscape.canonical.com<br>
 * Support:        https://ubuntu.com/pro<br><br>

 System information as of Wed Dec 18 09:09:07 UTC 2024<br>

  System load:  0.03              Processes:             114<br>
  Usage of /:   72.4% of 8.65GB   Users logged in:       0<br>
  Memory usage: 15%               IPv4 address for ens4: 10.128.0.7<br>
  Swap usage:   0%<br><br>

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.
<br>
   https://ubuntu.com/engage/secure-kubernetes-at-the-edge
<br>

_______________________________________________________________________________________________
Download the VPN configuration here:<br>
http://34.29.208.198:8003/07aacafa-afe7-11ef-9480-4b0208fdeff2/gns3vm.ovpn<br>

And add it to your openvpn client.<br>

apt-get remove nginx-light to disable the HTTP server.<br>
And remove this file with rm /etc/update-motd.d/70-openvpn<br>

Expanded Security Maintenance for Applications is not enabled.<br>

21 updates can be applied immediately.<br>
To see these additional updates run: apt list --upgradable<br>

Enable ESM Apps to receive additional future security updates.<br>
See https://ubuntu.com/esm or run: sudo pro status<br><br><br>


*** System restart required ***<br>
Last login: Mon Dec  9 15:21:15 2024 from 35.235.244.32<br>

</details>

- Paste ovpn link [http://34.29.208.198:8003/07aacafa-afe7-11ef-9480-4b0208fdeff2/gns3vm.ovpn] this link on your browser

- Right-Click the ovpn file and Click edit with notepad 

<details>
<summary>It will look like this</summary>
client<br>
nobind<br>
comp-lzo<br>
dev tun<br>
<key><br>
-----BEGIN PRIVATE KEY-----<br>
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoGDKqMA0jpwfR
pScQsAvcVQ7ZQ6DDv228lLySABkFSgtYpS1kBxoRCHo1SY/CjYRBVDQfRNzxV0iZ
0EmfKf7w8cs/up/ckd+1Zx7MryVzb2FltbwCcGnyoWnVXih+86h0vhyLoCF5cX6B
vspu+PhtuXHUr8AcwasrQGA4QZ+m8N405Zz0+s0zTQB97ByTQfxEMYjTaWqSqTLp
j8niRWa97uqZhIEaEa+YIGJCZdURHDys5He7SK7Lpp6F3B3MMoho0dL5+8UB3Bhh
Bd1j+VkEcD/puZ7BgIQKaTs9KUfRB2WR29sU+JM76atJVUC3XAdjGKCjnkkoZzo+
aGm+7E4LAgMBAAECggEAU9fmBY98LklVFBPNfXxiHh9rDaG24YxtPv/tYuGbmVDK
gge5sUf9j3tsAYJUq5UM380RRnuBvPttYhNLdZFr8WCZoYsDy/AS5pet/ChshLyM
lz/jrE/H+NbcRCn4BwKgBsMA2AAiUkHy+OJidKHIwGocRhr3tyA+sY8lr0nESW7S
ObvdLj2y/JybsgLq5txKgFtY1PTKK94jivICQ5+8a89DCqvXzxBO1xti5Y7l0hUt
0EgLK4XRbdW6nPN5nclAn0sbF60Udj2SE3R+Ljf3T3Z9LisjrSdShde549kDXfYF
rt2RwPD88wxLEZkA3ivnSu5sfqLfp0aQDVXOtdLoAQKBgQDYFv+OJg6MmKtAQ78u
SQNKeTl7RNWg91gJI4wipN8vIocl18dyZe+8yL/fcvQiO04JMu7Pc3ZU/lUFeebH
+gSED3rJT/pQXbwZWbMrGTZQX7ShxUTw8sv6ljC9uq3djAMagespEnWE5tqv6j/C
BUCedE6wMC4Qw9TxD06HviBCCwKBgQDHI+uYZaGCBGHUKT1AiXNRjEWpE/TdRCK8
TEdqpLv+dQq5oQEVuqe9k7E4ncNyiChHR0Km5dXmFpiB6lJmH7gixwdHqrWLg5nb
m2j0wlyOVmOqktAmkqd6CmCq10/3BfCVnCy91MlZ76XoSYYLOn4K4RIKGSXB2x0E
JrL6ZpekAQKBgEln7qJkTTb3ud0X5n8bsHGBIsS8SnHm9FIOcFFofqStbwms9oTn
GfygmYWXsFVcnhLD6ZoxV/Zhe5JjqcEvLo+KDqUKdTcN0JMwBIxUgT3mdR8rO1M6
t45FrQMWwm9rW7aKgc8vBRsDrTBrPAN181CgpAZ4J33seI73Ky8zqBOnAoGAWKzf
GRKQc7P92BqxAs7yAesjjeGsFOdlTFHvL0bBy9JUf0p5kDJ4xUtCDEL8KEEHJo5N
2MHZmMaRDLDKFl2jgiD8VeZnRwPH/GlcuDjgPCWt5ePQOoztdMOwPgL4wbfsZMKR
jcp2Cs1TJHew78kRHUkR3ltKW+N1LUcKRcRvXAECgYBxg7Q8Pf0oHvzGjvWLy1wR
TYv/C4vKHE76xYNp1TR8J+BkwG1SIA3bb+lZtsgxZc9d4HxR9x7Gbm/tzYXHXFzC
5OM6ArW9I8OojO9wZ/sHD4ML7JGLzSgX8Um1lk1j0IfEpoNg7w5j+BPVSV0VmhM2
r0J3tfbbl5wqIWaJVlw3HQ==
-----END PRIVATE KEY-----
</key><br>
<cert><br>
-----BEGIN CERTIFICATE-----<br>
MIICrTCCAZUCFDxcwKYSfH2NtYrf6yrujLkLvTo1MA0GCSqGSIb3DQEBCwUAMBIx
EDAOBgNVBAMMB09wZW5WUE4wIBcNMjQxMjAxMTMyMTA1WhgPMjA5MjEyMTkxMzIx
MDVaMBIxEDAOBgNVBAMMB09wZW5WUE4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
ggEKAoIBAQCoGDKqMA0jpwfRpScQsAvcVQ7ZQ6DDv228lLySABkFSgtYpS1kBxoR
CHo1SY/CjYRBVDQfRNzxV0iZ0EmfKf7w8cs/up/ckd+1Zx7MryVzb2FltbwCcGny
oWnVXih+86h0vhyLoCF5cX6Bvspu+PhtuXHUr8AcwasrQGA4QZ+m8N405Zz0+s0z
TQB97ByTQfxEMYjTaWqSqTLpj8niRWa97uqZhIEaEa+YIGJCZdURHDys5He7SK7L
pp6F3B3MMoho0dL5+8UB3BhhBd1j+VkEcD/puZ7BgIQKaTs9KUfRB2WR29sU+JM7
6atJVUC3XAdjGKCjnkkoZzo+aGm+7E4LAgMBAAEwDQYJKoZIhvcNAQELBQADggEB
ACxtqVwuNSBvNfJDluAYWgB1sJYu+nhDjputAZvQ79J9l/dSTk5810pdzkaTx8Gl
ekG8iuxBEiKaJI8nPrqSUJnVwjtIboge4j30B6w1oJkkH59Q+HehuCz6b0H1FPyj
ITHvQDAmN7UZM9GhuDWJqlylZ9RzPVUFL2suzWxBRDxKQuQrJ3xiaU3cHHtbLxqp
amL4SDtYBF6dWanppb8ndrZOadkIeA5fjz7weurPdWxATVlzc19IN5elEEc4p2Bl
DFrPJ1xWqUbre9BYmM8NPwQeNDeV/TuUhO1iRU+2J+xcIjPWDxNW67542jF3bq2X
i86LiziN4Wn3V9iu/0LWMDQ=
-----END CERTIFICATE-----<br>
</cert><br>
<ca><br>
-----BEGIN CERTIFICATE-----<br>
MIICrTCCAZUCFDxcwKYSfH2NtYrf6yrujLkLvTo1MA0GCSqGSIb3DQEBCwUAMBIx
EDAOBgNVBAMMB09wZW5WUE4wIBcNMjQxMjAxMTMyMTA1WhgPMjA5MjEyMTkxMzIx
MDVaMBIxEDAOBgNVBAMMB09wZW5WUE4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
ggEKAoIBAQCoGDKqMA0jpwfRpScQsAvcVQ7ZQ6DDv228lLySABkFSgtYpS1kBxoR
CHo1SY/CjYRBVDQfRNzxV0iZ0EmfKf7w8cs/up/ckd+1Zx7MryVzb2FltbwCcGny
oWnVXih+86h0vhyLoCF5cX6Bvspu+PhtuXHUr8AcwasrQGA4QZ+m8N405Zz0+s0z
TQB97ByTQfxEMYjTaWqSqTLpj8niRWa97uqZhIEaEa+YIGJCZdURHDys5He7SK7L
pp6F3B3MMoho0dL5+8UB3BhhBd1j+VkEcD/puZ7BgIQKaTs9KUfRB2WR29sU+JM7
6atJVUC3XAdjGKCjnkkoZzo+aGm+7E4LAgMBAAEwDQYJKoZIhvcNAQELBQADggEB
ACxtqVwuNSBvNfJDluAYWgB1sJYu+nhDjputAZvQ79J9l/dSTk5810pdzkaTx8Gl
ekG8iuxBEiKaJI8nPrqSUJnVwjtIboge4j30B6w1oJkkH59Q+HehuCz6b0H1FPyj
ITHvQDAmN7UZM9GhuDWJqlylZ9RzPVUFL2suzWxBRDxKQuQrJ3xiaU3cHHtbLxqp
amL4SDtYBF6dWanppb8ndrZOadkIeA5fjz7weurPdWxATVlzc19IN5elEEc4p2Bl
DFrPJ1xWqUbre9BYmM8NPwQeNDeV/TuUhO1iRU+2J+xcIjPWDxNW67542jF3bq2X
i86LiziN4Wn3V9iu/0LWMDQ=<br>
-----END CERTIFICATE-----<br>
</ca><br>
<dh><br>
-----BEGIN DH PARAMETERS-----<br>
MIIBCAKCAQEAkBIvo3YkaoKWq/phXcwNjAGy3deuHye1QFx6MMhwyo78Mj4lH4ju
btxH4lKaaQBb0BWoGKrdZtUa7rdeQ9bLqfME1sCS/7hPuTEZYbmpA7TY1IXorDSD
MHXMQxTFxPIwWj899Gfr1u1IRGG7eOBnVV8CHeTlpurlg+YqCR7UXAHaUvWmPL3D
g1zUGb8ICDEP70gK1IXaYW81joPJtd5XCaKFwmLnh7yCvQ2+LPLu2eaTfVUl7rup
xQG0GiJ3/e7BGLx8C7M2VmVzzecrGnyMrqqNVrUH2qekOVQMAY5mtEYFj/fV+2tm
rM5KB9RLrKusLOFs3K2kPrejKkuvvfzlDwIBAg==
-----END DH PARAMETERS-----<br>
</dh><br>
<connection><br>
remote 34.29.208.198 1194 udp<br>
</connection><br>
</details>

- Remove the from `<dl> until </dl>`

<details>
<summary>It will look like this</summary>
client<br>
nobind<br>
comp-lzo<br>
dev tun<br>
<key><br>
-----BEGIN PRIVATE KEY-----<br>
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoGDKqMA0jpwfR
pScQsAvcVQ7ZQ6DDv228lLySABkFSgtYpS1kBxoRCHo1SY/CjYRBVDQfRNzxV0iZ
0EmfKf7w8cs/up/ckd+1Zx7MryVzb2FltbwCcGnyoWnVXih+86h0vhyLoCF5cX6B
vspu+PhtuXHUr8AcwasrQGA4QZ+m8N405Zz0+s0zTQB97ByTQfxEMYjTaWqSqTLp
j8niRWa97uqZhIEaEa+YIGJCZdURHDys5He7SK7Lpp6F3B3MMoho0dL5+8UB3Bhh
Bd1j+VkEcD/puZ7BgIQKaTs9KUfRB2WR29sU+JM76atJVUC3XAdjGKCjnkkoZzo+
aGm+7E4LAgMBAAECggEAU9fmBY98LklVFBPNfXxiHh9rDaG24YxtPv/tYuGbmVDK
gge5sUf9j3tsAYJUq5UM380RRnuBvPttYhNLdZFr8WCZoYsDy/AS5pet/ChshLyM
lz/jrE/H+NbcRCn4BwKgBsMA2AAiUkHy+OJidKHIwGocRhr3tyA+sY8lr0nESW7S
ObvdLj2y/JybsgLq5txKgFtY1PTKK94jivICQ5+8a89DCqvXzxBO1xti5Y7l0hUt
0EgLK4XRbdW6nPN5nclAn0sbF60Udj2SE3R+Ljf3T3Z9LisjrSdShde549kDXfYF
rt2RwPD88wxLEZkA3ivnSu5sfqLfp0aQDVXOtdLoAQKBgQDYFv+OJg6MmKtAQ78u
SQNKeTl7RNWg91gJI4wipN8vIocl18dyZe+8yL/fcvQiO04JMu7Pc3ZU/lUFeebH
+gSED3rJT/pQXbwZWbMrGTZQX7ShxUTw8sv6ljC9uq3djAMagespEnWE5tqv6j/C
BUCedE6wMC4Qw9TxD06HviBCCwKBgQDHI+uYZaGCBGHUKT1AiXNRjEWpE/TdRCK8
TEdqpLv+dQq5oQEVuqe9k7E4ncNyiChHR0Km5dXmFpiB6lJmH7gixwdHqrWLg5nb
m2j0wlyOVmOqktAmkqd6CmCq10/3BfCVnCy91MlZ76XoSYYLOn4K4RIKGSXB2x0E
JrL6ZpekAQKBgEln7qJkTTb3ud0X5n8bsHGBIsS8SnHm9FIOcFFofqStbwms9oTn
GfygmYWXsFVcnhLD6ZoxV/Zhe5JjqcEvLo+KDqUKdTcN0JMwBIxUgT3mdR8rO1M6
t45FrQMWwm9rW7aKgc8vBRsDrTBrPAN181CgpAZ4J33seI73Ky8zqBOnAoGAWKzf
GRKQc7P92BqxAs7yAesjjeGsFOdlTFHvL0bBy9JUf0p5kDJ4xUtCDEL8KEEHJo5N
2MHZmMaRDLDKFl2jgiD8VeZnRwPH/GlcuDjgPCWt5ePQOoztdMOwPgL4wbfsZMKR
jcp2Cs1TJHew78kRHUkR3ltKW+N1LUcKRcRvXAECgYBxg7Q8Pf0oHvzGjvWLy1wR
TYv/C4vKHE76xYNp1TR8J+BkwG1SIA3bb+lZtsgxZc9d4HxR9x7Gbm/tzYXHXFzC
5OM6ArW9I8OojO9wZ/sHD4ML7JGLzSgX8Um1lk1j0IfEpoNg7w5j+BPVSV0VmhM2
r0J3tfbbl5wqIWaJVlw3HQ==<br>
-----END PRIVATE KEY-----<br>
</key><br>
<cert><br>
-----BEGIN CERTIFICATE-----<br>
MIICrTCCAZUCFDxcwKYSfH2NtYrf6yrujLkLvTo1MA0GCSqGSIb3DQEBCwUAMBIx
EDAOBgNVBAMMB09wZW5WUE4wIBcNMjQxMjAxMTMyMTA1WhgPMjA5MjEyMTkxMzIx
MDVaMBIxEDAOBgNVBAMMB09wZW5WUE4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
ggEKAoIBAQCoGDKqMA0jpwfRpScQsAvcVQ7ZQ6DDv228lLySABkFSgtYpS1kBxoR
CHo1SY/CjYRBVDQfRNzxV0iZ0EmfKf7w8cs/up/ckd+1Zx7MryVzb2FltbwCcGny
oWnVXih+86h0vhyLoCF5cX6Bvspu+PhtuXHUr8AcwasrQGA4QZ+m8N405Zz0+s0z
TQB97ByTQfxEMYjTaWqSqTLpj8niRWa97uqZhIEaEa+YIGJCZdURHDys5He7SK7L
pp6F3B3MMoho0dL5+8UB3BhhBd1j+VkEcD/puZ7BgIQKaTs9KUfRB2WR29sU+JM7
6atJVUC3XAdjGKCjnkkoZzo+aGm+7E4LAgMBAAEwDQYJKoZIhvcNAQELBQADggEB
ACxtqVwuNSBvNfJDluAYWgB1sJYu+nhDjputAZvQ79J9l/dSTk5810pdzkaTx8Gl
ekG8iuxBEiKaJI8nPrqSUJnVwjtIboge4j30B6w1oJkkH59Q+HehuCz6b0H1FPyj
ITHvQDAmN7UZM9GhuDWJqlylZ9RzPVUFL2suzWxBRDxKQuQrJ3xiaU3cHHtbLxqp
amL4SDtYBF6dWanppb8ndrZOadkIeA5fjz7weurPdWxATVlzc19IN5elEEc4p2Bl
DFrPJ1xWqUbre9BYmM8NPwQeNDeV/TuUhO1iRU+2J+xcIjPWDxNW67542jF3bq2X
i86LiziN4Wn3V9iu/0LWMDQ=
-----END CERTIFICATE-----<br>
</cert><br>
<ca><br>
-----BEGIN CERTIFICATE-----<br>
MIICrTCCAZUCFDxcwKYSfH2NtYrf6yrujLkLvTo1MA0GCSqGSIb3DQEBCwUAMBIx
EDAOBgNVBAMMB09wZW5WUE4wIBcNMjQxMjAxMTMyMTA1WhgPMjA5MjEyMTkxMzIx
MDVaMBIxEDAOBgNVBAMMB09wZW5WUE4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
ggEKAoIBAQCoGDKqMA0jpwfRpScQsAvcVQ7ZQ6DDv228lLySABkFSgtYpS1kBxoR
CHo1SY/CjYRBVDQfRNzxV0iZ0EmfKf7w8cs/up/ckd+1Zx7MryVzb2FltbwCcGny
oWnVXih+86h0vhyLoCF5cX6Bvspu+PhtuXHUr8AcwasrQGA4QZ+m8N405Zz0+s0z
TQB97ByTQfxEMYjTaWqSqTLpj8niRWa97uqZhIEaEa+YIGJCZdURHDys5He7SK7L
pp6F3B3MMoho0dL5+8UB3BhhBd1j+VkEcD/puZ7BgIQKaTs9KUfRB2WR29sU+JM7
6atJVUC3XAdjGKCjnkkoZzo+aGm+7E4LAgMBAAEwDQYJKoZIhvcNAQELBQADggEB
ACxtqVwuNSBvNfJDluAYWgB1sJYu+nhDjputAZvQ79J9l/dSTk5810pdzkaTx8Gl
ekG8iuxBEiKaJI8nPrqSUJnVwjtIboge4j30B6w1oJkkH59Q+HehuCz6b0H1FPyj
ITHvQDAmN7UZM9GhuDWJqlylZ9RzPVUFL2suzWxBRDxKQuQrJ3xiaU3cHHtbLxqp
amL4SDtYBF6dWanppb8ndrZOadkIeA5fjz7weurPdWxATVlzc19IN5elEEc4p2Bl
DFrPJ1xWqUbre9BYmM8NPwQeNDeV/TuUhO1iRU+2J+xcIjPWDxNW67542jF3bq2X
i86LiziN4Wn3V9iu/0LWMDQ=<br>
-----END CERTIFICATE-----<br>
</ca><br>
<connection><br>
remote 34.29.208.198 1194 udp<br>
</connection><br>

</details>


7. Download OpenVPN Connect 
- Open it and Drop the ovpn file 

8. Open GNS3 go to Edit>Preference>Server>Remote Server>Add 
	- Change the host : `172.16.253.1`

9. Open GNS3 go to Edit>Preference>Server>Main Server>Host Binding

	- Choose `172.16.253.6`

---
## Problem and Solutions

 1. Version Mismatch Between Server and GNS3

- If your server and GNS3 versions are not the same:
- Update your server or download the latest version of GNS3 from their [official website](https://www.gns3.com).

2. External IP Address Changes After Restart

- When you restart your device, the external IP address might change:
- Update the `.ovpn` file to reflect the new external IP address.
--- 
