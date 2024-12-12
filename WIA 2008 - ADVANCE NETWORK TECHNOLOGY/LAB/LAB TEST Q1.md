1. IPv4 and IPv6
```
network : 133.71.0.0/16
ipv6 : 2001:133:71::/48

physical 
network : 101.100.133.71/24
ipv6 : 2001:101:100:133::71/64
```

R3 - R2
network : 133.71.1.0 /30
1st ip : 133.71.1.1
last ip : 133.71.1.2
broadcast : 133.71.1.3

1st ipv6 : 2001:133:71:1::1/64
2nd ipv6 : 2001:133:71:1::2/64

R2-R1
network : 133.71.1.4 /30
1st ip : 133.71.1.5
last ip : 133.71.1.6
broadcast : 133.71.1.7


1st ipv6 : 2001:133:71:2::1/64
2nd ipv6 : 2001:133:71:2::2/64


2. Assign ip
- R3
```
int lo 0 
ip add 133.71.99.99 255.255.255.255
ipv6 add 2001:133:71:99::99/128

int g1/0
ip add 133.71.1.1 255.255.255.252
no ipv6 add 2001:133:71::1/64
ipv6 add 2001:133:71:1::1/64
no shut
```

- R2
```
int lo 0 
ip add 133.71.99.100 255.255.255.255
ipv6 add 2001:133:71:99::100/128

int g1/0
ip add 133.71.1.2 255.255.255.252
no ipv6 add 2001:133:71::3/64
ipv6 add 2001:133:71:1::2/64
no shut

int g2/0
ip add 133.71.1.5 255.255.255.252
no ipv6 add 2001:133:71::4/64
ipv6 add 2001:133:71:2::1/64
no shut

```

- R1
```
int lo 0 
ip add 133.71.2.0 255.255.255.255
ipv6 add 2001:133:71::10/128


int g0/1
ip add 133.71.1.6 255.255.255.252
ipv6 add 2001:133:71:2::2/64
no shut

```

1. OSPF
- R3
```
router ospf 1
network 133.71.1.0 255.255.255.252 area 0
area 0 authentication message-digest
```

- R2
```
router ospf 1
network 133.71.1.0 255.255.255.252 area 0
area 0 authentication message-digest

default-information originate always
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
1. Static Route
- R2
```
ip routing
ipv6 unicast-routing

ip route 133.71.2.0  255.255.255.255 133.71.1.2
ipv6 route 2001:133:71:99::100/64 2001:100:100::2
```

- R1
```
ip routing
ipv6 unicast-routing

ip route 133.71.2.0 255.255.255.255 133.71.1.2
ipv6 route 001:133:71::10/64 2001:133:71:2::2

```

3. Ebgp
- R1
```
router bgp 17
bgp router-id 1.1.1.1
neighbor 100.100.71.2 remote-as 21
network 142.71.0.0 mask 255.255.0.0 
```

```
router bgp 10
bgp router-id 4.4.4.4
neighbor 100.100.71.1 remote-as 20
network 150.100.0.0 mask 255.255.0.0

ip route 150.100.0.0 255.255.0.0 null0
```
