![Pasted image 20241215220457.png](../../images/Pasted%20image%2020241215220457.png)

```
network : 133.71.0.0/16
ipv6 : 2001:133:71::/48
```

- link R1 with peer
```
network : 101.100.133.71/24
ipv6 : 2001:101:100:133::71/64
```

1. Configuration
```

R3 - R2 
network : 133.71.1.0 /30
1st ip : 133.71.1.1
last ip : 133.71.1.2
broadcast : 133.71.1.3

ipv6 1st : 2001:133:71:1::1/64
ipv6 2nd : 2001:133:71:1::2/64

R2 - R1 
network : 133.71.1.4 /30
1st ip : 133.71.1.5
last ip : 133.71.1.6
broadcast : 133.71.1.7

ipv6 1st : 2001:133:71:2::1/64
ipv6 2nd : 2001:133:71:2::2/64

loopback 
R3 : 133.71.2.1 
R2 : 133.71.2.2
R1 : 133.71.2.3

ipv6
R3 : 2001:133:71:100::1/128
R2 : 2001:133:71:100::2/128
R1 : 2001:133:71:100::3/128
```
- R3
```
int lo 0 
ip add 133.71.2.1 255.255.255.255
ipv6 add 2001:133:71:100::1/128
```

- R2 
```
int lo 0 
ip add 133.71.2.2 255.255.255.255
ipv6 add 2001:133:71:100::2/128
```

- R1 
```
int lo 0 
ip add 133.71.2.3 255.255.255.255
ipv6 add 2001:133:71:100::3/128
```
1. OSPF R3 & R2

- R3
```
int g1/0
ip add 133.71.1.1 255.255.255.252
ipv6 add 2001:133:71:1::1/64
no shut
```
- R2 
```
int g1/0
ip add 133.71.1.2 255.255.255.252
ipv6 add 2001:133:71:1::2/64
no shut
```

- R3 & R2
```
router ospf 1
network 133.71.1.0 255.255.255.252 area 0
 
int g1/0 
ip ospf network point-to-point

ip routing
```

- R3
```
router ospf 1
network 133.71.2.1 255.255.255.255 area 0
```

- R2 
```
router ospf 1
network 133.71.2.2 255.255.255.255 area 0

default-information originate always
```

- R3 & R2
```
ipv6 unicast-routing

int range g1/0 , lo 0
ipv6 ospf 1 area 0
ipv6 ospf network point-to-point

```
- R2
```
ipv6 router ospf 1
default-information originate always
```


3. ip route R2 and R1
- R2
```
int g2/0
ip add 133.71.1.5 255.255.255.252
ipv6 add 2001:133:71:2::1/64
no shut
```

- R1
```
int g2/0
ip add 133.71.1.6 255.255.255.252
ipv6 add 2001:133:71:2::2/64
no shut
```

```
int g0/1
ip add 133.71.1.6 255.255.255.252
ipv6 add 2001:133:71:2::2/64
no shut
```
- R2
```
ip route 133.71.1.4 255.255.255.252 133.71.1.6
ipv6 route 2001:133:71:2::/64 2001:133:71:2::2
```
- R1
```
no ip route 133.71.1.0 255.255.255.252 133.71.1.5
no ipv6 route 2001:133:71:1::/64 2001:133:71:2::1

no ip route 133.71.2.1 255.255.255.255 133.71.1.5
no ipv6 route 2001:133:71:100::1/128 2001:133:71:2::1

ip route 133.71.0.0 255.255.0.0 133.71.1.5
ipv6 route 2001:101:100:133::71/64 2001:133:71:2::1


```
- R2
```
ip route 0.0.0.0 0.0.0.0 133.71.1.6
ipv6 route ::0/0 2001:133:71:2::2
```
1. Ebgp
 - R1
```
int g3/0
ip add  101.100.133.71 255.255.255.0
ipv6 add 2001:101:100:133::71/64
no shut
```
- PHYSICAL
```
int g0/0
ip add  101.100.133.71 255.255.255.0
ipv6 add 2001:101:100:133::71/64
no shut
```
- R1H2
```
int g3/0
ip add  101.100.133.70 255.255.255.0
ipv6 add 2001:101:100:133::70/64
no shut
```
- R1
```
router bgp 17
bgp router-id 1.1.1.1
neighbor 101.100.133.70 remote-as 18
network 133.71.0.0 mask 255.255.0.0 


ip route 133.71.0.0 255.255.0.0 null0
ipv6 route 2001:133:71::/48 null 0
```

```
router bgp 17
bgp router-id 1.1.1.1
neighbor 101.100.133.95 remote-as 15
network 133.71.0.0 mask 255.255.0.0 


no ip route 133.71.0.0 255.255.0.0 null0
no ipv6 route 2001:133:71::/48 null 0
```

```

ipv6 unicast-routing
router bgp 17

bgp log-neighbor-changes
address-family ipv6
neighbor 2001:101:100:133::70 remote-as 18
network 2001:133:71::/48
```

```
ipv6 unicast-routing
router bgp 17

bgp log-neighbor-changes
neighbor 2001:101:100:133::70 remote-as 18
address-family ipv6
neighbor 2001:101:100:133::70 activate
network 2001:133:71::/48
```

```
ipv6 unicast-routing
router bgp 17

bgp log-neighbor-changes
neighbor 2001:101:100:133::95 remote-as 15
address-family ipv6
neighbor 2001:101:100:133::95 activate
network 2001:133:71::/48

```
- R1H2
```
router bgp 18
bgp router-id 2.2.2.2
neighbor 101.100.133.71 remote-as 17
network 133.70.0.0 mask 255.255.0.0 

ip route 133.70.0.0 255.255.0.0 null0
ipv6 route 2001:133:70::/48 null 0
```

```

ipv6 unicast-routing
router bgp 18

bgp log-neighbor-changes
address-family ipv6
neighbor 2001:101:100:133::71 remote-as 17
network 2001:133:70::/48
```
1. Other network 
- R3H2
```
int lo 0 
ip add 133.70.2.1 255.255.255.255
ipv6 add 2001:133:70:100::1/128

int g1/0
ip add 133.70.1.1 255.255.255.252
ipv6 add 2001:133:70:1::1/64
no shut

router ospf 1
network 133.70.1.0 255.255.255.252 area 0
network 133.70.2.1 255.255.255.255 area 0

int g1/0 
ip ospf network point-to-point

ip routing

ipv6 unicast-routing

int range g1/0
ipv6 ospf 1 area 0
ipv6 ospf network point-to-point
```

- R2H2
```
int lo 0 
ip add 133.70.2.2 255.255.255.255
ipv6 add 2001:133:70:100::2/128

int g1/0
ip add 133.70.1.2 255.255.255.252
ipv6 add 2001:133:70:1::2/64
no shut

router ospf 1
network 133.70.1.0 255.255.255.252 area 0
 
int g1/0 
ip ospf network point-to-point

ip routing

router ospf 1
network 133.70.2.2 255.255.255.255 area 0

default-information originate always

ipv6 unicast-routing

int range g1/0
ipv6 ospf 1 area 0
ipv6 ospf network point-to-point

ipv6 router ospf 1
default-information originate always

int g2/0
ip add 133.70.1.5 255.255.255.252
ipv6 add 2001:133:70:2::1/64
no shut

ip route 133.70.1.4 255.255.255.252 133.70.1.6
ipv6 route 2001:133:70:2::/64 2001:133:70:2::2

ip route 0.0.0.0 0.0.0.0 133.70.1.6
ipv6 route ::0/0 2001:133:70:2::2
```


- R1H2
```
int lo 0 
ip add 133.70.2.3 255.255.255.255
ipv6 add 2001:133:70:100::3/128

int g2/0
ip add 133.70.1.6 255.255.255.252
ipv6 add 2001:133:70:2::2/64
no shut

ip route 133.70.1.0 255.255.255.252 133.70.1.5
ipv6 route 2001:133:70:1::/64 2001:133:70:2::1
```