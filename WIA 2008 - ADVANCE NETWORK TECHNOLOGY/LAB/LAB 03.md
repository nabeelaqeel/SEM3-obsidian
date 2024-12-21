![Pasted image 20241112002806.png](../../images/Pasted%20image%2020241112002806.png)

1. Etherchannel 
- R1
```
int port 1
int g4/0
cha 1 
int g5/0
cha 1

int port 1
ip add 142.71.3.21 255.255.255.252
ipv6 add 2001:142:71:10::1/64
```
- R3
```
int port 1
int g2/0
cha 1 
int g1/0
cha 1

int port 1
ip add 142.71.3.22 255.255.255.252
ipv6 add  2001:142:71:10::2/64
```

2. Static Route & Static null route
- R2
```
ip route 150.100.0.0 255.255.0.0 100.100.71.2 
ip route 150.100.0.0 255.255.0.0 g4/0

ipv6 route 2001:150:100::/48 2001:100:100:71::1

ip route 142.71.0.0 255.255.0.0 null0
ipv6 route 2001:142:71::/48 null0

int g4/0
ip add 100.100.71.1 255.255.255.252
ipv6 add 2001:100:100:71::/127

int range g1/0 , g2/0 , g3/0
ipv6 ospf 1 area 0

```

- R4
```
int g1/0
ip add 100.100.71.2 255.255.255.252
ipv6 add 2001:100:100:71::1/127

int lo0
ip add 150.100.4.1 255.255.255.255
ipv6 add 2001:150:100:9::1/128

ip route 142.71.0.0 255.255.0.0 100.100.71.1
no ip route 142.71.0.0 255.255.0.0 g1/0
no ipv6 route 2001:142:71::/48 g1/0
ipv6 route 2001:142:71::/48 2001:100:100:71::
```

- PHYSICAL ISP
```
int g0/1
ip add 100.100.71.2 255.255.255.252
ipv6 add 2001:100:100:71::1/127

int lo0
ip add 150.100.4.1 255.255.255.255
ipv6 add 2001:150:100:9::1/128

ip route 142.71.0.0 255.255.0.0 100.100.71.1
ip route 142.71.0.0 255.255.0.0 g0/1
ipv6 route 2001:142:71::/48 g0/1
ipv6 route 2001:142:71::/48 2001:100:100:71::


username cisco password 0 cisco
line vty 0 4
transport input telnet
ip domain-name rtp.cisco.com
crypto key generate rsa
```
3. Remove static route
```
no ip route ---

ALL FROM previous lab
```

4. OSPF
- R1
```
router ospf 1
network 142.71.3.0 0.0.0.3 area 0
network 142.71.3.4 0.0.0.3 area 0
network 142.71.3.8 0.0.0.3 area 0
network 142.71.3.20 0.0.0.3 area 50
area 50 authentication message-digest
area 0 authentication message-digest

int range g1/0 , g2/0 , g3/0 , port 1
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

int range g1/0 , g2/0 , g3/0
ipv6 ospf 1 area 0

int g1/0
ipv6 ospf authentication ipsec spi 256 md5 1234567890ABCDEF1234567890ABCDEF

int g2/0
ipv6 ospf authentication ipsec spi 257 md5 1234567890ABCDEF1234567890ABCDEF

int g3/0
ipv6 ospf authentication ipsec spi 258 md5 1234567890ABCDEF1234567890ABCDEF

int port 1
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 259 md5 1234567890ABCDEF1234567890ABCDEF

```
- R2
```
router ospf 1
network 142.71.3.0 0.0.0.3 area 0
network 142.71.3.12 0.0.0.3 area 0
network 142.71.3.16 0.0.0.3 area 0
passive-interface g4/0
area 0 authentication message-digest
default-information originate always

int range g1/0 , g2/0 , g3/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
	 
ip ospf message-digest-key 1 md5 CISCO

int g1/0
ipv6 ospf authentication ipsec spi 258 md5 1234567890ABCDEF1234567890ABCDEF

int g2/0
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

int g3/0
ipv6 ospf authentication ipsec spi 261 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
default-information originate always
passive-interface g4/0

```

- R3
```
router ospf 1
network 142.71.3.20 0.0.0.3 area 50
network 142.71.3.24 0.0.0.3 area 50
area 50 authentication message-digest


int range port 1 , g3/0
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

ipv6 unicast-routing
int port 1
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 259 md5 1234567890ABCDEF1234567890ABCDEF

int g3/0
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

 
int lo0
ip add 142.71.4.3 255.255.255.255
ipv6 add 2001:142:71:9::3/128


ipv6 router ospf 1
```

- DSW1
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

- DSW2
```
router ospf 1
network 142.71.3.8 0.0.0.3 area 0
network 142.71.3.16 0.0.0.3 area 0
network 142.71.2.128 0.0.0.127 area 0
network 142.71.2.0 0.0.0.127 area 0
network 142.71.0.1 0.0.1.255 area 0
passive-interface f3/0
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
ipv6 ospf authentication ipsec spi 257 md5 1234567890ABCDEF1234567890ABCDEF
  
int f0/1
ipv6 ospf authentication ipsec spi 261 md5 1234567890ABCDEF1234567890ABCDEF

int range vlan 101 - 103
ipv6 ospf 1 area 0

int vlan 101
ipv6 ospf authentication ipsec spi 270 md5 1234567890ABCDEF1234567890ABCDEF

int vlan 102
ipv6 ospf authentication ipsec spi 280 md5 1234567890ABCDEF1234567890ABCDEF

int vlan 103
ipv6 ospf authentication ipsec spi 290 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
passive-interface vlan 101
passive-interface vlan 102
passive-interface vlan 103
```
- Verification
```
sh ip ospf neighbor
sh ip protocols
sh ip ospf
sh ip ospf int [interface]

sh ipv6 ospf 
sh ipv6 route ospf
sh ipv6 ospf database
```
> NOTE : ospf process id is local to that  router
   NOTE : passive interface block router from send hello packet
5. Other configuration

- R3
```
int g3/0
ip add 142.71.3.25 255.255.255.252
ipv6 add 2001:142:71:11::1/64
```

- DSW5
```
int f0/0
ip add 142.71.3.26 255.255.255.252
ipv6 add 2001:142:71:11::2/64
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO

int f3/0
sw mode acc
sw acc vlan 104


int vlan 104
ip add 142.71.5.1 255.255.255.192 
ipv6  add 2001:142:71:14::1/64

ip routing
router ospf 1
network 142.71.5.0 0.0.0.63 area 50
network 142.71.3.24 0.0.0.3 area 50
passive-interface vlan 104
area 50 authentication message-digest

ipv6 unicast-routing
int f0/0
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 260 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1

int lo0 
ip add 142.71.4.15 255.255.255.255
ipv6 add 2001:142:71:9::15/128
ipv6 ospf 1 area 50

int vlan 104
no ipv6 add 2001:142:71:4::1/128
ipv6 ospf 1 area 50

int vlan 104
ipv6 ospf 1 area 50
ipv6 ospf authentication ipsec spi 270 md5 1234567890ABCDEF1234567890ABCDEF
```

6. PC configuration
```
ip 142.71.5.11 255.255.255.192 142.71.5.1
ip 2001:142:71:14::11/64 2001:142:71:14::1
```
