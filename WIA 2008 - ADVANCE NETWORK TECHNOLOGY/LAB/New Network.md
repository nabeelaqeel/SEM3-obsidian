## Layer 3

### IP and IPv6

- R1
```
int g1/0
ip add 142.62.3.1 255.255.255.252 
ipv6 add 2001:142:62:4::1/64

int g2/0
ip add 142.62.3.5 255.255.255.252 
ipv6 add 2001:142:62:5::1/64

int g3/0
ip add 142.62.3.9 255.255.255.252 
ipv6 add 2001:142:62:6::1/64


int port 1
int g4/0
cha 1 
int g5/0
cha 1

int port 1
ip add 142.62.3.21 255.255.255.252
ipv6 add 2001:142:62:10::1/64

int range g1/0 , g2/0 , g3/0 , po1
no shut
```

- R2
```
int g1/0
ip add 142.62.3.2 255.255.255.252 
ipv6 add 2001:142:62:4::2/64

int g2/0
ip add 142.62.3.13 255.255.255.252 
ipv6 add 2001:142:62:7::1/63

int g3/0
ip add 142.62.3.17 255.255.255.252 
ipv6 add 2001:142:62:8::1/64

int g4/0
ip add 142.62.3.29 255.255.255.252 
ipv6 add 2001:142:62:12::1/64

int range g1/0 , g2/0 , g3/0 , g4/0
no shut

```

- R-GW
```
int g4/0
ip add 142.62.3.30 255.255.255.252 
ipv6 add 2001:142:62:12::2/64
no shut

int g2/0
ip add 100.100.62.1 255.255.255.252
ipv6 add 2001:100:100:62::/127
```

```
router bgp 22
neighbor 100.100.62.2 remote-as 21
network 142.62.0.0 mask 255.255.0.0

ip route 142.62.0.0 255.255.0.0 null0

ipv6 unicast-routing
router bgp 22

bgp log-neighbor-changes
neighbor 2001:100:100:62::1 remote-as 21
address-family ipv6
neighbor 2001:100:100:62::1 activate
network 2001:142:62::/48

ipv6 route 2001:142:62::/48 null0
```

---
OSPF 
- R-GW
```
router ospf 1
network 142.62.3.28 0.0.0.3 area 60
area 60 authentication message-digest
passive-interface g2/0
default-information originate always


int g4/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO


ipv6 unicast-routing
int g4/0
ipv6 ospf 1 area 60
ipv6 ospf authentication ipsec spi 262 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
passive-interface g2/0
default-information originate always
```

- R2
```
router ospf 1
network 142.62.3.28 0.0.0.3 area 60
area 60 authentication message-digest

int g4/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO


ipv6 unicast-routing
int g4/0
ipv6 ospf 1 area 60
ipv6 ospf authentication ipsec spi 262 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
```

```
router ospf 1
network 142.62.3.0 0.0.0.3 area 0
network 142.62.3.12 0.0.0.3 area 0
network 142.62.3.16 0.0.0.3 area 0
area 0 authentication message-digest

int range g1/0 , g2/0 , g3/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ipv6 ospf 1 area 0
ip ospf message-digest-key 1 md5 CISCO

int g1/0
ipv6 ospf authentication ipsec spi 258 md5 1234567890ABCDEF1234567890ABCDEF

int g2/0
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

int g3/0
ipv6 ospf authentication ipsec spi 261 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
```

- R1
```
ip routing
ipv6 unicast-routing
router ospf 1
network 142.62.3.0 0.0.0.3 area 0
network 142.62.3.4 0.0.0.3 area 0
network 142.62.3.8 0.0.0.3 area 0
network 142.62.3.20 0.0.0.3 area 50
area 50 authentication message-digest
area 0 authentication message-digest

int range g1/0 , g2/0 , g3/0 , port 1
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO


int range g1/0 , g2/0 , g3/0
ipv6 ospf 1 area 0

int g1/0
ipv6 ospf authentication ipsec spi 258 md5 1234567890ABCDEF1234567890ABCDEF

int port 1
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 259 md5 1234567890ABCDEF1234567890ABCDEF

```

```
int g2/0
ipv6 ospf authentication ipsec spi 257 md5 1234567890ABCDEF1234567890ABCDEF

int g3/0
ipv6 ospf authentication ipsec spi 258 md5 1234567890ABCDEF1234567890ABCDEF

```
- R3
```
router ospf 1
network 142.62.3.20 0.0.0.3 area 50
network 142.62.3.24 0.0.0.3 area 50
area 50 authentication message-digest


int range port 1 , g1/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

	ipv6 unicast-routing
int port 1
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 259 md5 1234567890ABCDEF1234567890ABCDEF

int g1/0
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

 
int lo0
ip add 142.62.4.3 255.255.255.255
ipv6 add 2001:142:62:9::3/128


ipv6 router ospf 1
```


- DSW5
```
int f0/0
ip add 142.62.3.26 255.255.255.252
ipv6 add 2001:142:62:11::2/64
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

int f3/0
sw mode acc
sw acc vlan 104


int vlan 104
ip add 142.62.5.1 255.255.255.192 
ipv6  add 2001:142:62:14::1/64

ip routing
router ospf 1
network 142.62.5.0 0.0.0.63 area 50
network 142.62.3.24 0.0.0.3 area 50
passive-interface vlan 104
area 50 authentication message-digest

ipv6 unicast-routing
int f0/0
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1

int lo0 
no ip add 142.71.4.15 255.255.255.255
no ipv6 add 2001:142:71:9::15/128
ip add 142.62.4.15 255.255.255.255
ipv6 add 2001:142:62:9::15/128
ipv6 ospf 1 area 50

int vlan 104
no ipv6 add 2001:142:71:4::1/128
ipv6 ospf 1 area 50

int vlan 104
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 270 md5 1234567890ABCDEF1234567890ABCDEF
```

```
router ospf 1
network 142.71.3.4 0.0.0.3 area 0
network 142.71.3.12 0.0.0.3 area 0
network 142.71.2.128 0.0.0.127 area 0
network 142.71.2.0 0.0.0.127 area 0
network 142.71.0.1 0.0.1.255 area 0
passive-interface f3/1
passive-interface f3/2
passive-interface vlan 101
passive-interface vlan 102
passive-interface vlan 103
area 0 authentication message-digest

int range f0/0 - 1
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO
ipv6 ospf 1 area 0

int f0/0
ipv6 ospf authentication ipsec spi 256 md5 1234567890ABCDEF1234567890ABCDEF

int f0/1
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

int range vlan 101 - 103
ipv6 ospf 1 area 0

int vlan 101
ipv6 ospf authentication ipsec spi 270 md5 1234567890ABCDEF1234567890ABCDEF

int vlan 102
ipv6 ospf authentication ipsec spi 280 md5 1234567890ABCDEF1234567890ABCDEF

int vlan 103
ipv6 ospf authentication ipsec spi 290 md5 1234567890ABCDEF1234567890ABCDEF

int range f3/0 , f3/2
ipv6 ospfv3 passive


ipv6 router ospf 1
passive-interface vlan 101
passive-interface vlan 102
passive-interface vlan 103
```
---

- ISP
```
int g2/0
ip add 100.100.62.2 255.255.255.252
ipv6 add 2001:100:100:62::1/127
```

```
router bgp 21
neighbor 100.100.62.1 remote-as 22

ipv6 unicast-routing
router bgp 21

bgp log-neighbor-changes
neighbor 2001:100:100:62:: remote-as 22
address-family ipv6
neighbor 2001:100:100:62:: activate

```
- DSW1
```
int f0/0
ip add 142.62.3.6 255.255.255.252 
ipv6 add 2001:142:62:5::2/64

int f0/1
ip add 142.71.3.14 255.255.255.252 
ipv6 add 2001:142:62:7::2/64

```

- DSW2

```
int f0/0
ip add 142.62.3.18 255.255.255.252 
ipv6 add 2001:142:62:8::2/64

int f0/1
ip add 142.62.3.10 255.255.255.252 
ipv6 add 2001:142:62:6::2/64
```

- R3
```
int port 1
int g4/0
cha 1 
int g5/0
cha 1

int port 1
ip add 142.62.3.22 255.255.255.252
ipv6 add 2001:142:62:10::2/64

int g1/0
ip add 142.62.3.25 255.255.255.252
ipv6 add 2001:142:62:11::1/64

int g2/0
ip add 192.168.101.1 255.255.255.252


int range g1/0 , g2/0 , po1 
no shut
```

- R1
```
int g1/0
ip add 142.62.3.1 255.255.255.252 
ipv6 add 2001:142:62:4::1/64

int g2/0
ip add 142.62.3.5 255.255.255.252 
ipv6 add 2001:142:62:5::1/64

int g3/0
ip add 142.62.3.9 255.255.255.252 
ipv6 add 2001:142:62:6::1/64

int port 1
ip add 142.62.3.21 255.255.255.252
ipv6 add 2001:142:62:10::1/64

int range g1/0 , g2/0 , g3/0 , po1
no shut

```

---

DHCP

```
ip dhcp excluded-address 192.168.0.1 192.168.0.10
ip dhcp excluded-address 192.168.100.1 192.168.100.2

ip dhcp pool DHCP_NET105
network 192.168.0.0 255.255.255.128
default-router 192.168.0.1 
dns-server 192.168.0.1
domain-name lab6.com
```

```
service dhcp

int vlan 1
ip helper-address 192.168.100.1 
```


---
VPN
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key MYPASSWORD address 100.100.71.1
crypto ipsec transform-set MYTRANSFORMSET esp-aes esp-sha-hmac
mode tunnel

crypto map CRYPTOMAP 10 ipsec-isakmp
set peer 100.100.71.1
set transform-set MYTRANSFORMSET
match address R-GW_IPSEC
```

```
ip access-list extended R-GW_IPSEC
permit ip 142.62.0.0 0.0.255.255 142.71.0.0 0.0.255.255
permit ip 142.71.0.0 0.0.255.255 142.62.0.0 0.0.255.255
```

```
int g2/0
crypto map CRYPTOMAP
```

```
no ip route 142.71.0.0 255.255.0.0 100.100.71.1
```
- IPV6
- R-GW
```
crypto isakmp policy 10
encryption aes
hash md5
authentication pre-share
group 2

crypto isakmp key secretkey address ipv6 2001:100:100:71::/127
crypto ipsec transform-set IPV6-TRANSFORM esp-aes esp-sha-hmac
mode tunnel

crypto map ipv6 IPV6-CM 10 ipsec-isakmp
set peer 2001:100:100:71::
set transform-set IPV6-TRANSFORM
match address R-GW_IPV6

interface GigabitEthernet2/0
ipv6 enable
ipv6 crypto map IPV6-CM
```

```
ipv6 access-list R-GW_IPV6
permit ip 2001:142:62::/48  2001:142:71::/48 
permit ip 2001:142:71::/48  2001:142:62::/48 
```