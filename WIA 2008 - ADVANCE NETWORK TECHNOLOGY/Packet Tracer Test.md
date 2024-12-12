1. Configure R1 

```
no ip domain lookup
hostname R1
banner motd #Unauthorized Access is Prohibited#
```

```
line console 0
password cisconpass
login

enable secret ciscoenpass
service password-encryption
security password min-length 10
```

- SSH

```
username admin secret admin1pass
ip domain name ccna-ptsa.com
crypto key generate rsa
```

```
ip ssh version 2
line vty 0 15
login local
transport input ssh
```

```
int lo 0
description Loopback 
ip add 209.165.201.1 255.255.255.224
ipv6 add 2001:db8:acad:209::1/64
ipv6 add fe80::1 link-local
```

- Router Subinterface
```
ipv6 unicast-routing

int g0/0/1.2
encapsulation dot1q 2
description Bikes
ip add 10.19.8.1 255.255.255.192
ipv6 add 2001:db8:acad:a::1/64
ipv6 add fe80::1 link-local


int g0/0/1.3
encapsulation dot1q 3
description Trikes
ip add 10.19.8.65 255.255.255.224
ipv6 add 2001:db8:acad:b::1/64
ipv6 add fe80::1 link-local

int g0/0/1.4
encapsulation dot1q 4
description Management
ip add 10.19.8.97 255.255.255.248
ipv6 add 2001:db8:acad:c::1/64
ipv6 add fe80::1 link-local

int g0/0/1.6
encapsulation dot1q 6 native
description Native

int g0/0/1
no shut
```

2. Configure S1 
- S1
```
no ip domain lookup
hostname S1
banner motd #Unauthorized Access is Prohibited#
```

- S2
```
no ip domain lookup
hostname S2
banner motd #Unauthorized Access is Prohibited#
```

- S1 & S2
```
line console 0
password ciscoconpass
login

enable secret ciscoenpass
service password-encryption
```

```
username admin secret admin1pass
ip domain name ccna-ptsa.com
crypto key generate rsa
```

```
ip ssh version 2
line vty 0 15
login local
transport input ssh
```

3. Configure SVIs

- S1
```
int vlan 4
ip add 10.19.8.98 255.255.255.248
description Management Interface
no shut

ip default-gateway 10.19.8.97
```

- S2
```
int vlan 4
ip add 10.19.8.99 255.255.255.248
description Management Interface
no shut

ip default-gateway 10.19.8.97
```

4. Configure Network Infrastructure Settings
- S1
```
vlan 2
name Bikes
vlan 3
name Trikes
vlan 4
name Management
vlan 5
name Parking
vlan 6
name Native

int range f0/1 - 2
sw mode tru
sw trunk native vlan 6
sw tru allowed vlan 2,3,4,5,6

int f0/5
sw mode tru
sw tru native vlan 6
sw tru allowed vlan 2,3,4,5,6

```

- S2
```
vlan 2
name Bikes
vlan 3
name Trikes
vlan 4
name Management
vlan 5
name Parking
vlan 6
name Native

int range f0/1 - 2
sw mode tru
sw tru native vlan 6
sw tru allowed vlan 2,3,4,5,6
```

5. Configure Etherchannel
- S1
```
int range f0/1 - 2
channel-group 1 mode active
int port-channel 1
```
- S2
```
int range f0/1 - 2
channel-group 1 mode active
int port-channel 1
```

6. Configure Switchports
- S1
```
int f0/6
description host
sw mode access
sw port-security
sw access vlan 2
sw port-security
sw port-security max 3

int range f0/3 - 4 , f0/7 - 24 , g0/1 - 2
sw mode acc
sw acc vlan 5
description Unused Interfaces
sh
```

- S2
```
int f0/18
sw mode acc
sw port-security
sw acc vlan 3
sw port-security max 3

int range f0/3 - 17 , f0/19 - 24 , g0/1 - 2
sw mode acc
sw acc vlan 5
description Unused Interfaces
sh
```

7. Routing 
- R1 
```
ip route 0.0.0.0 0.0.0.0 loopback 0
ipv6 route ::/0 loopback 0
```

8. DHCP 
- R1 
- VLAN 2
```
ip dhcp excluded-address 10.19.8.1 10.19.8.52
ip dhcp pool CCNA-A
network 10.19.8.0 255.255.255.192
default-router 10.19.8.1
domain-name ccna-a.net
```
- VLAN 2
```
ip dhcp excluded-address 10.19.8.65 10.19.8.84
ip dhcp pool CCNA-B
network 10.19.8.64 255.255.255.224
default-router 10.19.8.65
domain-name ccna-b.net
```


- Reference
https://itexamanswers.net/srwe-version-7-00-final-pt-skills-assessment-exam-ptsa-answers.html
https://www.youtube.com/watch?v=B9GTedZSSyE

https://itexamanswers.net/ccna-2-v7-0-final-exam-answers-full-switching-routing-and-wireless-essentials.html