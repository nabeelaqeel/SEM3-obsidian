VLAN 3 : 300 : 2^9 - 2 : 510  /23
VLAN 2 : 100 0 : 2^ 7 - 2 : 126 /25
VLAN 1 : 70 : 2^7 -2 : 126  /25
VLAN 104 : 50 : 2^6 -2 : 62 /26

142.71.0.0 /16
2001:142:71::/48

external ip : 150.100.0.0/16
ipv6 : 2001:150:100::/48

VLAN 3
1st address : 142.71.0.1
Last address : 142.71.1.254
Broadcast : 142.71.1.255

ipv6 : 2001:142:71:3::/64

VLAN 2:
network : 142.71.2.0
1st address : 142.71.2.1
last addresss : 142.71.2.126
broadcast : 142.71.2.127

ipv6 : 2001:142:71:2::/64

VLAN 1:
network : 142.71.2.128
1st address : 142.71.2.129
last address : 142.71.2.254
broadcast : 142.71.2.255

ipv6 : 2001:142:71:1::/64

VLAN 104: /26 (DMZ)
network : 142.71.5.0
1st address : 142.71.5.1
last address : 142.71.5.62
broadcast : 142.71.5.63

ipv6 : 2001:142:71:14::/64

VLAN 105 : 2 ip /30
network : 142.71.5.64
1st address : 142.71.5.65
last adderess : 142.71.5.66
broadcast : 142.71.5.67

NET 105
192.168.0.0 : 2^7 : 128 - 2 :126 /25

network      :  192.168.0.0
1st ip       :  192.168.0.1
last ip      :  192.168.0.126
broadcast    :  192.168.0.127



DSW1 : 
vlan 101  : 142.71.2.135
vlan 102  : 142.71.2.6
vlan 103  : 142.71.0.8

DSW2 : 
vlan 101  : 142.71.2.136
vlan 102  : 142.71.2.7
vlan 103  : 142.71.0.9

HSRP DSW1 - DSW2 :

vlan 101 : 142.71.2.134
vlan 102 : 142.71.2.5
vlan 101 : 142.71.0.7

vlan 101 : 2001:142:71:1::10/64
vlan 102 : 2001:142:71:2::10/64
vlan 103 : 2001:142:71:3::10/64
Core Area: 

R1 - R2: R1(1st) R2(Last)
network : 142.71.3.0 
1st ip : 142.71.3.1     
last ip : 142.71.3.2
Broadcast : 142.71.3.3

ipv6 first : 2001:142:71:4::1/64
ipv6 last  : 2001:142:71:4::2/64

R1 - DSW1 : 
network : 142.71.3.4
1st add : 142.71.3.5
last add: 142.71.3.6
broadcast: 142.71.3.7

ipv6 first : 2001:142:71:5::1/64
ipv6 last  : 2001:142:71:5::2/64

R1 - DSW2 : 
network : 142.71.3.8
1st add : 142.71.3.9
last add: 142.71.3.10
broadcast: 142.71.3.11

ipv6 first : 2001:142:71:6::1/64
ipv6 last  : 2001:142:71:6::2/64

R2 - DSW1 : 
network : 142.71.3.12
1st add : 142.71.3.13
last add: 142.71.3.14
broadcast: 142.71.3.15


ipv6 first : 2001:142:71:7::1/64
ipv6 last  : 2001:142:71:7::2/64

R2 - DSW2 : 
network : 142.71.3.16
1st add : 142.71.3.17
last add: 142.71.3.18 
broadcast: 142.71.3.19


ipv6 first : 2001:142:71:8::1/64
ipv6 last  : 2001:142:71:8::2/64


loopback : 
R1 : 142.71.4.1 /32	
R2 : 142.71.4.2 /32
R3 : 142.71.4.3 /32
R-GW : 142.71.4.4/32
R4(ISP) : 150.100.4.1 /32
DSW5 : 142.71.4.15 /32

R1 :  2001:142:71:9::1/128
R2 :  2001:142:71:9::2/128
R3 :  2001:142:71:9::3/128
R-GW : 2001:142:71:9::4/128
R4(ISP) :  2001:150:100:9::1/128
DSW5 : 2001:142:71:9::15/128

R1 - R3
network : 142.71.3.20
1st add : 142.71.3.21
last add: 142.71.3.22 
broadcast: 142.71.3.23


ipv6 first : 2001:142:71:10::1/64
ipv6 last  : 2001:142:71:10::2/64

R3 - DSW5
network : 142.71.3.24
1st add : 142.71.3.25
last add: 142.71.3.26 
broadcast: 142.71.3.27


ipv6 first : 2001:142:71:11::1/64
ipv6 last  : 2001:142:71:11::2/64


R-GW - R4:
network : 100.100.71.0/30
1st add : 100.100.71.1
last ad : 100.100.71.2
broadcast: 100.100.100.71.4

1st add : 2001:100:100:71::/127
2nd add : 2001:100:100:71::1/127

R3 - DSW6 :
network : 192.168.100.0
1st add : 192.168.100.1
last add: 192.168.100.2
broadcast: 192.168.100.3


R2 - R-GW
network : 142.71.3.28
1st ip : 142.71.3.29
last add : 142.71.3.30
broadcast : 142.71.3.31

ipv6 1st : 2001:142:71:12::1/64
ipv6 2nd : 2001:142:71:12::2/64

- ISP
```
interface GigabitEthernet0/0.30
encapsulation dot1Q 30
ip add 100.100.71.2 255.255.255.252
ipv6 add 2001:100:100:71::1/127

router bgp 184
neighbor 100.100.71.1 remote-as 20
network 150.100.0.0 mask 255.255.0.0

ip route 150.100.0.0 255.255.0.0 null0

ipv6 unicast-routing
router bgp 184

bgp log-neighbor-changes
neighbor 2001:100:100:71:: remote-as 20
address-family ipv6
neighbor 2001:100:100:71:: activate
network 2001:150:100::/48

ipv6 route 2001:150:100::/48 null0
```

```
aaa new-model
username cisco password 0 cisco

ip domain-name cisco.com
crypto key generate rsa

ip ssh time-out 60
ip ssh authentication-retries 2
ip ssh version 2


ip access-list standard SSH_ACCESS
permit 142.71.2.128 0.0.0.127
line vty 0 4
access-class SSH_ACCESS in
transport input ssh
```


- R-GW
```
int g0/1
ip add 142.71.3.30 255.255.255.252
ipv6 add 2001:142:71:12::2/64

int g0/2
ip add 100.100.71.1 255.255.255.252
ipv6 add 2001:100:100:71::/127

	int lo0
ip add 142.71.4.4 255.255.255.255
ipv6 add 2001:142:71:9::4/128


router ospf 1
network 142.71.3.28 0.0.0.3 area 60
area 60 authentication message-digest
passive-interface g0/2
default-information originate always


int g0/1
ip ospf network point-to-point
ipv6 ospf network point-to-point
ip ospf message-digest-key 1 md5 CISCO


ipv6 unicast-routing
int g0/1
ipv6 ospf 1 area 60
ipv6 ospf authentication ipsec spi 262 md5 1234567890ABCDEF1234567890ABCDEF

ipv6 router ospf 1
passive-interface g0/2
default-information originate always

```

```
router bgp 20
bgp router-id 1.1.1.1
neighbor 100.100.71.2 remote-as 184
network 142.71.0.0 mask 255.255.0.0 

router bgp 20

bgp log-neighbor-changes
neighbor 2001:100:100:71::1 remote-as 184
address-family ipv6
neighbor 2001:100:100:71::1 activate
network 2001:142:71::/48

ip route 142.71.0.0 255.255.0.0 null0
ipv6 route 2001:142:71::/48 null0
```

```
ip access-list extended INFRASTRUCTURE
remark "All external traffic can only access DMZ"
remark Deny router interface for dmz
deny ip any host 142.71.5.1
permit ip any 142.71.5.0 0.0.0.63
permit icmp any any echo-reply
remark Enable Infrastructure ACL on R1
remark Deny special-use address sources
deny ip host 0.0.0.0 any
deny ip 127.0.0.0 0.255.255.255 any
deny ip 192.0.2.0 0.0.0.255 any
deny ip 224.0.0.0 31.255.255.255 any
remark Filter RFC 1918 space
deny ip 10.0.0.0 0.255.255.255 any
deny ip 172.16.0.0 0.15.255.255 any
deny ip 192.168.0.0 0.0.255.255 any
remark Deny your space as source from entering your AS
deny ip 142.71.0.0 0.0.255.255 any
remark Permit BGP
permit tcp host 100.100.71.2 host 100.100.71.1 eq bgp
permit tcp host 100.100.71.2 eq bgp host 100.100.71.1
remark Deny Access to Internal Infrastructure Address
deny ip any 142.71.0.0 0.0.255.255
```

```
int g0/2
ip access-group INFRASTRUCTURE in 
```

```
ipv6 access-list INFRASTRUCTURE_IPV6
remark All external traffic can only access DMZ
remark Deny router interface for dmz
deny ipv6 any 2001:142:71:14::1/128 
permit ipv6 any 2001:142:71:14::/64
permit icmp any any echo-reply
remark _Deny your space as source from entering your AS_
deny ipv6 2001:142:71::/48 any
remark _Permit multiprotocol BGP_
permit tcp host 2001:100:100:71::1 host 2001:100:100:71:: eq bgp
permit tcp host 2001:100:100:71::1 eq bgp host 2001:100:100:71::
remark _Deny access to internal infrastructure addresses_
deny ipv6 any 2001:142:71::/48
```

```
int g0/2
ipv6 traffic-filter INFRASTRUCTURE_IPV6 in
```

