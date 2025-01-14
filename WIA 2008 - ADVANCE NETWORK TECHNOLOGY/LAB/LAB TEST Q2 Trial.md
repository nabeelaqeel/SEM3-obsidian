![](../../images/Pasted%20image%2020250114000527.png)
## VPN 

IPV4

R1
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key MYPASSWORD address 101.100.133.70
crypto ipsec transform-set MYTRANSFORMSET esp-aes esp-sha-hmac
mode tunnel

crypto map CRYPTOMAP 10 ipsec-isakmp
set peer 101.100.133.70
set transform-set MYTRANSFORMSET
match address R-GW_IPSEC
```

```
ip access-list extended R-GW_IPSEC
permit ip 133.71.0.0 0.0.255.255 133.70.0.0 0.0.255.255
```

```
int g3/0
crypto map CRYPTOMAP
crypto isakmp enable
```

R1H2
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key MYPASSWORD address 101.100.133.71
crypto ipsec transform-set MYTRANSFORMSET esp-aes esp-sha-hmac
mode tunnel

crypto map CRYPTOMAP 10 ipsec-isakmp
set peer 101.100.133.71
set transform-set MYTRANSFORMSET
match address R-GW_IPSEC
```

```
ip access-list extended R-GW_IPSEC
permit ip 133.70.0.0 0.0.255.255 133.71.0.0 0.0.255.255
```

```
int g3/0
crypto map CRYPTOMAP
crypto isakmp enable
```

IPV6

R1
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key secretkey address ipv6 2001:101:100:133::70/64
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel

crypto map ipv6 IPV6-CM 10 ipsec-isakmp
set peer 2001:101:100:133::70
set transform-set IPV6-TRANSFORM
match address R-GW_IPV6

interface GigabitEthernet3/0
ipv6 enable
ipv6 crypto map IPV6-CM
```

```
ipv6 access-list R-GW_IPV6
permit ip 2001:133:71::/48 2001:133:70::/48
permit ip 2001:133:70::/48 2001:133:71::/48
```


R1H2
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key secretkey address ipv6 2001:101:100:133::71/64
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel

crypto map ipv6 IPV6-CM 10 ipsec-isakmp
set peer 2001:101:100:133::71
set transform-set IPV6-TRANSFORM
match address R-GW_IPV6

interface GigabitEthernet3/0
ipv6 enable
ipv6 crypto map IPV6-CM
```

```
ipv6 access-list R-GW_IPV6
permit ip 2001:133:71::/48 2001:133:70::/48
permit ip 2001:133:70::/48 2001:133:71::/48
```


---

## SSHv2

R2
```
no aaa new-model
username cisco password 0 cisco

ip domain-name cisco.com
crypto key generate rsa
```

```
ip ssh time-out 60
ip ssh authentication-retries 2
ip ssh version 2
```

```
ip access-list standard SSH_ACCESS
permit 133.71.0.0 0.0.255.255
line vty 0 4
privilege level 15
access-class SSH_ACCESS in
transport input ssh
```

R3
```
ssh -v 2 -l cisco 133.71.2.2
```

---


## DHCP

```
vlan 101 /25
network   : 133.71.0.0
1st ip    : 133.71.0.1
last ip   : 133.71.0.62
broadcast : 133.71.0.63
```

R3
```
ip dhcp excluded-address 133.71.0.1 133.71.0.10

ip dhcp pool DHCP_VLAN101
network 133.71.0.0 255.255.255.128
default-router 133.71.0.1
dns-server 133.71.0.1
domain-name labtest.com
```

```
int f0/0
ip add 133.71.0.1 255.255.255.128 
no shut
```

---

## PAT

```
PUBLIC : 133.71.4.0   / 30
NET104 : 192.168.71.0 / 24
```
PC3
```
ip 192.168.71.3 255.255.255.0 192.168.71.1
```
R3
```
int g2/0
ip add 192.168.71.1 255.255.255.0 
ip nat inside

int g1/0
ip nat outside

ip nat pool pool1 133.71.4.1 133.71.4.1 prefix 30
ip nat pool pool2 133.71.4.2 133.71.4.2 prefix 30

access-list 1 permit 192.168.71.0 0.0.0.127
access-list 2 permit 192.168.71.0 0.0.0.127

ip nat inside source list 1 pool pool1 overload
ip nat inside source list 2 pool pool2 overload

int lo 2
ip add 133.71.4.1 255.255.255.252 
```

```
router ospf 1
network 133.71.4.0 0.0.0.3 area 0
```

  IF you want other can ping your private also 
  
```
router ospf 1
network 192.168.71.0 0.0.0.255 area 0
```
---

## NTP

R2

```
ntp master 3
ntp logging
```

R1,R3
```
ntp server 133.71.2.2
```

---
## PRTG

PC
```
ip 133.71.3.2 255.255.255.252 133.71.3.1
```

R1
```
int g0/0
ip add 133.71.3.1 255.255.255.252
```


SNMP 

R1
```
snmp-server group SNMP-GROUP v3 priv
snmp-server user SNMP-USER SNMP-GROUP v3 auth md5 CISCO12345 priv aes 128 CISCO12345
snmp-server host 142.71.3.2 version 3 priv host-user
```

SYSLOG

```
logging host 133.71.3.2
logging trap informational
logging source lo 0
logging on
```

---

## PAST YEAR

![](../../images/Pasted%20image%2020250113221015.png)

### NETWORK

```
R1 - DSW1   : 133.71.1.8
R1 - DSW2   : 133.71.1.12

R1 - DSW1   : 2001:133:71:3::/64
R1 - DSW2   : 2001:133:71:4::/64

lo 0 
DSW1 : 133.71.2.4 
DSW2 : 133.71.2.5

ipv6
DSW1 : 2001:133:71:100::4/128
DSW2 : 2001:133:71:100::5/128
```

R1
```
int g4/0
ip add 133.71.1.9 255.255.255.252 
ipv6 add 2001:133:71:3::1/64

int g5/0
ip add 133.71.1.13 255.255.255.252 
ipv6 add 2001:133:71:4::1/64
```

DSW1
```
int f0/0
ip add 133.71.1.10 255.255.255.252 
ipv6 add 2001:133:71:3::2/64

int lo 0
ip add 133.71.2.4 255.255.255.255
ipv6 add 2001:133:71:100::4/128
```

DSW2
```
int f0/0 
ip add 133.71.1.14 255.255.255.252 
ipv6 add 2001:133:71:4::2/64

int lo 0
ip add 133.71.2.5 255.255.255.255
ipv6 add 2001:133:71:100::5/128
```

### EtherChannel
```
int port 1
int range f3/0 , f3/1
sh
no shut
channel-group 1 mode on
```

### OSPF Area 0

R1
```
router ospf 1
network 133.71.2.3 0.0.0.0 area 0
network 133.71.1.8 0.0.0.3 area 0
network 133.71.1.12 0.0.0.3 area 0

int range g4/0 , g5/0
ip ospf network point-to-point

int range g4/0 , g5/0
ipv6 ospf 1 area 0
```

DSW1
```
ip routing
ipv6 unicast-routing

router ospf 1
network 133.71.2.4 0.0.0.0 area 0
network 133.71.1.8 0.0.0.3 area 0

int range f0/0 
ip ospf network point-to-point

int range f0/0
ipv6 enable
ipv6 ospf 1 area 0
```

DSW2
```
ip routing
ipv6 unicast-routing

router ospf 1
network 133.71.2.5 0.0.0.0 area 0
network 133.71.1.12 0.0.0.3 area 0

int range f0/0
ip ospf network point-to-point

int range f0/0
ipv6 enable
ipv6 ospf 1 area 0
```

